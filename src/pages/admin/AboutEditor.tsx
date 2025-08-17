import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Save, X, Users, User } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  social_links: any;
  is_active: boolean;
  sort_order: number;
}

export default function AboutEditor() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch team members',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (member: TeamMember) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('team_members')
        .upsert(member);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Team member saved successfully',
      });

      await fetchTeamMembers();
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to save team member',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Team member deleted successfully',
      });

      await fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete team member',
        variant: 'destructive',
      });
    }
  };

  const addNewMember = () => {
    const newMember: TeamMember = {
      id: '',
      name: '',
      role: '',
      bio: '',
      photo_url: '',
      social_links: {},
      is_active: true,
      sort_order: teamMembers.length,
    };
    setEditingMember(newMember);
  };

  const updateSocialLink = (platform: string, url: string) => {
    if (!editingMember) return;
    const newSocialLinks = { ...editingMember.social_links };
    if (url.trim()) {
      newSocialLinks[platform] = url;
    } else {
      delete newSocialLinks[platform];
    }
    setEditingMember({ ...editingMember, social_links: newSocialLinks });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">About & Team Editor</h1>
          <p className="text-muted-foreground">
            Manage your team members and about page content
          </p>
        </div>
        <Button onClick={addNewMember} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Edit Modal */}
      {editingMember && (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-card">
            <CardTitle className="flex items-center justify-between">
              {editingMember.id ? 'Edit Team Member' : 'New Team Member'}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingMember(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      name: e.target.value
                    })}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role/Position</Label>
                  <Input
                    id="role"
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      role: e.target.value
                    })}
                    placeholder="CEO & Founder"
                  />
                </div>
                <div>
                  <Label htmlFor="photo_url">Photo URL</Label>
                  <Input
                    id="photo_url"
                    value={editingMember.photo_url || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      photo_url: e.target.value
                    })}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={editingMember.is_active}
                    onCheckedChange={(checked) => setEditingMember({
                      ...editingMember,
                      is_active: checked
                    })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio/Description</Label>
                  <Textarea
                    id="bio"
                    value={editingMember.bio || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      bio: e.target.value
                    })}
                    placeholder="Brief description about this team member"
                    rows={6}
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <Label className="text-base font-semibold">Social Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={editingMember.social_links.linkedin || ''}
                    onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={editingMember.social_links.twitter || ''}
                    onChange={(e) => updateSocialLink('twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={editingMember.social_links.github || ''}
                    onChange={(e) => updateSocialLink('github', e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={editingMember.social_links.website || ''}
                    onChange={(e) => updateSocialLink('website', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingMember(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSave(editingMember)}
                disabled={isSaving}
                className="btn-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Member'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="card-feature hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=5E1AF4&color=fff`;
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingMember(member)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge variant={member.is_active ? "default" : "secondary"}>
                  {member.is_active ? "Active" : "Inactive"}
                </Badge>
                
                {member.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {member.bio}
                  </p>
                )}
                
                {Object.keys(member.social_links).length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Social Links:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Object.keys(member.social_links).map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <Card className="text-center py-16">
          <CardContent>
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Team Members Found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first team member
            </p>
            <Button onClick={addNewMember} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}