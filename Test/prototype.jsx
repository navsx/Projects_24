import { useState } from "react";
import { 
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarFallback,
} from "@/components/ui";

import { 
  Mic, 
  Menu,
  User,
  Settings, 
  LogOut,
  History,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Users,
  Download,
  Share2,
  Volume2
} from "lucide-react";

function EnhancedNCERTPodcaster() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Hello! How can I help you with your studies today?' }
  ]);

  // Mock data
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const subjects = ["Mathematics", "Science", "English", "Hindi", "Social Science"];
  const chapters = {
    "Mathematics": ["Algebra", "Geometry", "Trigonometry"],
    "Science": ["Light", "Electricity", "Chemical Reactions"],
    "English": ["Poetry", "Grammar", "Literature"]
  };
  const languages = ["English", "Hindi", "Telugu", "Tamil", "Malayalam"];

  // Welcome Screen
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
      <GraduationCap className="h-16 w-16 text-primary mb-6" />
      <h1 className="text-4xl font-bold mb-4">Welcome to NCERT Podcaster</h1>
      <p className="text-xl text-muted-foreground mb-8">Your AI Learning Companion</p>
      <Button 
        size="lg" 
        onClick={() => setCurrentPage('selection')}
        className="px-8"
      >
        Get Started
      </Button>
    </div>
  );

  // Selection Screen
  const SelectionScreen = () => (
    <Card className="max-w-md mx-auto m-4">
      <CardHeader>
        <CardTitle>Choose Your Learning Path</CardTitle>
        <CardDescription>Select your class, subject and preferred language</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Class</label>
          <Select onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your class..." />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Subject</label>
          <Select onValueChange={setSelectedSubject} disabled={!selectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your subject..." />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Chapter</label>
          <Select onValueChange={setSelectedChapter} disabled={!selectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your chapter..." />
            </SelectTrigger>
            <SelectContent>
              {chapters[selectedSubject]?.map((chapter) => (
                <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Language</label>
          <Select onValueChange={setSelectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Choose language..." />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>{language}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full mt-6" 
          disabled={!selectedClass || !selectedSubject || !selectedChapter || !selectedLanguage}
          onClick={() => setCurrentPage('chat')}
        >
          Start Learning
        </Button>
      </CardContent>
    </Card>
  );

  // Sidebar Component
  const Sidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="flex items-center gap-4 p-4">
            <Avatar>
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">User Name</h3>
              <p className="text-sm text-muted-foreground">student@example.com</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <History className="mr-2 h-4 w-4" /> Learning History
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentPage('welcome')}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Enhanced Chat Screen
  const ChatScreen = () => {
    const sendMessage = (e) => {
      e.preventDefault();
      if (!messageInput.trim()) return;
      
      setMessages([
        ...messages,
        { type: 'user', content: messageInput },
        { type: 'ai', content: `Let me help you understand ${selectedChapter} from ${selectedSubject}. What specific aspect would you like to learn about?` }
      ]);
      setMessageInput('');
    };

    return (
      <div className="h-screen flex flex-col">
        <div className="border-b p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sidebar />
              <div className="ml-12">
                <h2 className="font-semibold">{selectedSubject} - {selectedChapter}</h2>
                <p className="text-sm text-muted-foreground">{selectedClass}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Volume2 className="h-4 w-4 mr-2" />
                Voice Settings
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Group Study
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="quiz">Quiz Mode</TabsTrigger>
                <TabsTrigger value="visual">Visual Aids</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4 mt-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                      {message.type === 'ai' && (
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="quiz">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Quiz</CardTitle>
                    <CardDescription>Test your understanding of {selectedChapter}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Quiz content will be generated based on your learning progress.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visual">
                <Card>
                  <CardHeader>
                    <CardTitle>Visual Learning</CardTitle>
                    <CardDescription>Interactive diagrams and illustrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Visual aids will be displayed here to help understand concepts better.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="border-t p-4">
          <form onSubmit={sendMessage} className="max-w-5xl mx-auto flex gap-4">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1"
            />
            <Button type="submit">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send
            </Button>
            <Button
              type="button"
              variant={isRecording ? "destructive" : "secondary"}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className={`h-4 w-4 ${isRecording ? 'animate-pulse' : ''}`} />
            </Button>
          </form>
        </div>
      </div>
    );
  };

  // Main Render Logic
  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'selection':
        return <SelectionScreen />;
      case 'chat':
        return <ChatScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
}

export default EnhancedNCERTPodcaster;
