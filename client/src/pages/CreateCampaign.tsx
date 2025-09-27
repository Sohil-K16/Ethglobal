import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Calendar, DollarSign, Image, User, FileText, Loader2 } from 'lucide-react';
import { useStateContext } from '../context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { FormField, FormLabel, FormMessage } from '../components/ui/Form';

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const result = await createCampaign({ 
        ...form, 
        target: form.target 
      });
      
      if (result.success) {
        navigate('/');
      } else {
        console.error('Failed to create campaign:', result.error);
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Creating Campaign</h3>
            <p className="text-gray-400">Please wait while we process your campaign...</p>
          </Card>
        </div>
      )}

      {/* Header Card */}
      <Card variant="gradient" className="text-center">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Start a Campaign</CardTitle>
          <CardDescription className="text-lg">
            Create your crowdfunding campaign and turn your ideas into reality
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Form Card */}
      <Card variant="elevated">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                <User className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Campaign Creator</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField>
                  <FormLabel required>Your Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => handleFormFieldChange('name', e)}
                    required
                    variant="filled"
                  />
                </FormField>
                <FormField>
                  <FormLabel required>Campaign Title</FormLabel>
                  <Input
                    type="text"
                    placeholder="Write a catchy title"
                    value={form.title}
                    onChange={(e) => handleFormFieldChange('title', e)}
                    required
                    variant="filled"
                  />
                </FormField>
              </div>
            </div>

            {/* Campaign Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Campaign Details</h3>
              </div>
              <FormField>
                <FormLabel required>Story</FormLabel>
                <TextArea
                  placeholder="Tell your story... What's your campaign about? Why do you need funding?"
                  value={form.description}
                  onChange={(e) => handleFormFieldChange('description', e)}
                  required
                  variant="filled"
                  className="min-h-[120px]"
                />
                <FormMessage>Describe your project in detail to attract more supporters</FormMessage>
              </FormField>

              <FormField>
                <FormLabel required>Campaign Image</FormLabel>
                <Input
                  type="url"
                  placeholder="https://example.com/your-image.jpg"
                  value={form.image}
                  onChange={(e) => handleFormFieldChange('image', e)}
                  required
                  variant="filled"
                />
                <FormMessage>Use a high-quality image that represents your campaign</FormMessage>
              </FormField>
            </div>

            {/* Funding Info Card */}
            <Card variant="gradient" className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Target className="w-12 h-12 text-green-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">100% Funding Guarantee</h3>
                    <p className="text-green-200">You receive all the funds raised from your supporters</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Funding Goals</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField>
                  <FormLabel required>Funding Goal (ETH)</FormLabel>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0.50"
                    value={form.target}
                    onChange={(e) => handleFormFieldChange('target', e)}
                    required
                    variant="filled"
                  />
                  <FormMessage>Enter the amount you need to raise in ETH</FormMessage>
                </FormField>
                <FormField>
                  <FormLabel required>End Date</FormLabel>
                  <Input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => handleFormFieldChange('deadline', e)}
                    required
                    variant="filled"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <FormMessage>When should your campaign end?</FormMessage>
                </FormField>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Launch Campaign
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;