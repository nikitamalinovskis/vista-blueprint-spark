import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactSettings {
  id: string;
  address?: string;
  phone?: string;
  email?: string;
  map_embed?: string;
  business_hours: any;
}

const defaultBusinessHours = {
  monday: '9:00 AM - 6:00 PM',
  tuesday: '9:00 AM - 6:00 PM',
  wednesday: '9:00 AM - 6:00 PM',
  thursday: '9:00 AM - 6:00 PM',
  friday: '9:00 AM - 6:00 PM',
  saturday: 'Closed',
  sunday: 'Closed',
};

export default function ContactEditor() {
  const [settings, setSettings] = useState<ContactSettings>({
    id: '',
    address: '',
    phone: '',
    email: '',
    map_embed: '',
    business_hours: defaultBusinessHours,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const fetchContactSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          ...data,
          business_hours: data.business_hours || defaultBusinessHours,
        });
      }
    } catch (error) {
      console.error('Error fetching contact settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch contact settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let { error } = await supabase
        .from('contact_settings')
        .upsert(settings);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Contact settings saved successfully',
      });

      await fetchContactSettings();
    } catch (error) {
      console.error('Error saving contact settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save contact settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateBusinessHour = (day: string, hours: string) => {
    setSettings({
      ...settings,
      business_hours: {
        ...settings.business_hours,
        [day]: hours,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading contact settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Settings</h1>
        <p className="text-muted-foreground">
          Manage your contact information and business hours
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Information */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
            <CardDescription>
              Update your business contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Business Address</span>
              </Label>
              <Textarea
                id="address"
                value={settings.address || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  address: e.target.value
                })}
                placeholder="123 Business St, City, State 12345"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </Label>
              <Input
                id="phone"
                value={settings.phone || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  phone: e.target.value
                })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  email: e.target.value
                })}
                placeholder="contact@company.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Business Hours</span>
            </CardTitle>
            <CardDescription>
              Set your operating hours for each day
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(settings.business_hours).map(([day, hours]) => (
              <div key={day}>
                <Label htmlFor={day} className="capitalize">
                  {day}
                </Label>
                <Input
                  id={day}
                  value={hours}
                  onChange={(e) => updateBusinessHour(day, e.target.value)}
                  placeholder="9:00 AM - 6:00 PM or Closed"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Map Embed */}
      <Card className="card-feature">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Map Embed</span>
          </CardTitle>
          <CardDescription>
            Add a Google Maps embed code to show your location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="map_embed">Google Maps Embed Code</Label>
            <Textarea
              id="map_embed"
              value={settings.map_embed || ''}
              onChange={(e) => setSettings({
                ...settings,
                map_embed: e.target.value
              })}
              placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get embed code from Google Maps by searching for your location, clicking "Share", then "Embed a map"
            </p>
          </div>
          
          {settings.map_embed && (
            <div>
              <Label>Map Preview</Label>
              <div 
                className="mt-2 rounded-lg overflow-hidden border border-border"
                dangerouslySetInnerHTML={{ __html: settings.map_embed }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Contact Settings'}
        </Button>
      </div>
    </div>
  );
}