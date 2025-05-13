
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReaderScreen = () => {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [inputMessage, setInputMessage] = useState('');

  const mockMessages = [
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I can help you understand this document. What would you like to know?',
      timestamp: new Date()
    },
    {
      id: '2',
      role: 'user',
      content: 'Can you summarize the key points about quantum physics?',
      timestamp: new Date()
    },
    {
      id: '3',
      role: 'assistant',
      content: 'Quantum physics is the study of matter and energy at the most fundamental level. It explains phenomena at the atomic and subatomic levels. Key concepts include:\n\n1. Wave-particle duality\n2. Uncertainty principle\n3. Quantum entanglement\n4. Superposition of states',
      timestamp: new Date()
    }
  ];

  const renderChatMessage = ({ item }) => {
    const isUser = item.role === 'user';
    
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.aiMessageContainer
      ]}>
        <Text style={styles.messageSender}>
          {isUser ? 'You' : 'AI Assistant'}
        </Text>
        <Text style={styles.messageContent}>
          {item.content}
        </Text>
        <Text style={styles.messageTime}>
          {item.timestamp.toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // In a real app, we would send the message to an API
      console.log('Message sent:', inputMessage);
      setInputMessage('');
    }
  };

  if (!isDocumentOpen) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Neural Reader</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <Text style={styles.subtitle}>
            Read, annotate, and extract knowledge from documents.
          </Text>
          
          <View style={styles.uploadContainer}>
            <View style={styles.uploadIcon} />
            <Text style={styles.uploadTitle}>Upload Document</Text>
            <Text style={styles.uploadDescription}>
              Drag and drop your document here or click to browse. Supported formats: PDF, EPUB, DOCX, TXT, MD.
            </Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setIsDocumentOpen(true)}
            >
              <Text style={styles.uploadButtonText}>Browse Files</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionTitle}>Recent Documents</Text>
          
          <View style={styles.emptyDocuments}>
            <View style={styles.bookIcon} />
            <Text style={styles.emptyTitle}>No Documents Yet</Text>
            <Text style={styles.emptyDescription}>
              Upload your first document to start reading and learning.
            </Text>
          </View>
        </ScrollView>
        
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsDocumentOpen(true)}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.documentHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setIsDocumentOpen(false)}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.documentTitle} numberOfLines={1}>
          Quantum Physics Introduction.pdf
        </Text>
      </View>
      
      <View style={styles.readerContainer}>
        {/* Document content area */}
        <View style={styles.documentContent}>
          <Text style={styles.documentHeading}>Introduction to Quantum Physics</Text>
          <Text style={styles.documentParagraph}>
            Quantum physics is the branch of physics that deals with the behavior of matter and light on a subatomic and atomic level. It attempts to explain the properties of atoms and molecules and their fundamental particles like protons, neutrons, electrons, gluons, and quarks.
          </Text>
          <Text style={styles.documentParagraph}>
            The birth of quantum mechanics is attributed to Max Planck's quantum hypothesis in 1900. Planck was working on the problem of how the radiation from a glowing body changes with temperature. He proposed that energy could only be emitted or absorbed in discrete units, which he called quanta.
          </Text>
          <Text style={styles.documentParagraph}>
            This was followed by Albert Einstein's paper on the photoelectric effect in 1905, which proposed that light also delivers its energy in chunks, later called photons.
          </Text>
        </View>
        
        {/* Sidebar tabs */}
        <View style={styles.sidebarContainer}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'notes' ? styles.activeTab : null
              ]}
              onPress={() => setActiveTab('notes')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'notes' ? styles.activeTabText : null
              ]}>Notes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'chat' ? styles.activeTab : null
              ]}
              onPress={() => setActiveTab('chat')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'chat' ? styles.activeTabText : null
              ]}>AI Chat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'highlights' ? styles.activeTab : null
              ]}
              onPress={() => setActiveTab('highlights')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'highlights' ? styles.activeTabText : null
              ]}>Highlights</Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'chat' && (
            <View style={styles.chatContainer}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatTitle}>AI Learning Assistant</Text>
              </View>
              
              <View style={styles.chatPrompt}>
                <Text style={styles.chatPromptText}>
                  Ask me questions about quantum physics, request explanations, or generate learning materials.
                </Text>
              </View>
              
              <FlatList
                data={mockMessages}
                renderItem={renderChatMessage}
                keyExtractor={item => item.id}
                style={styles.messagesList}
              />
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ask about quantum physics..."
                  placeholderTextColor="#666"
                  value={inputMessage}
                  onChangeText={setInputMessage}
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendMessage}
                >
                  <Text style={styles.sendButtonText}>↑</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          {activeTab === 'notes' && (
            <View style={styles.notesContainer}>
              <Text style={styles.noContentText}>No notes yet. Add notes while reading to organize your thoughts.</Text>
            </View>
          )}
          
          {activeTab === 'highlights' && (
            <View style={styles.highlightsContainer}>
              <Text style={styles.noContentText}>No highlights yet. Highlight text in the document to save important concepts.</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#9b87f5',
    marginTop: 4,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  uploadContainer: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#9b87f5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  emptyDocuments: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
  },
  bookIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9b87f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#9b87f5',
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  readerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  documentContent: {
    padding: 20,
    backgroundColor: '#1e1e1e',
    flex: 2,
  },
  documentHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  documentParagraph: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 12,
    lineHeight: 22,
  },
  sidebarContainer: {
    backgroundColor: '#1a1a1a',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#9b87f5',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#9b87f5',
  },
  chatContainer: {
    flex: 1,
    padding: 12,
  },
  chatHeader: {
    marginBottom: 12,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chatPrompt: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  chatPromptText: {
    color: '#cccccc',
    fontSize: 14,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  userMessageContainer: {
    backgroundColor: 'rgba(155, 135, 245, 0.2)',
    alignSelf: 'flex-end',
    marginLeft: 50,
  },
  aiMessageContainer: {
    backgroundColor: '#2a2a2a',
    alignSelf: 'flex-start',
    marginRight: 50,
  },
  messageSender: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  messageContent: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#ffffff',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#9b87f5',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  notesContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightsContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ReaderScreen;
