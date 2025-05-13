
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample notes data
const initialNotes = [
  {
    id: '1',
    title: 'Quantum Entanglement',
    content: 'Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated...',
    created: '2025-05-10T10:30:00',
    tags: ['Physics', 'Quantum', 'Research'],
  },
  {
    id: '2',
    title: 'Neural Networks Architecture',
    content: 'The architecture of neural networks consists of input layers, hidden layers, and output layers...',
    created: '2025-05-08T14:15:00',
    tags: ['AI', 'Machine Learning', 'Computer Science'],
  }
];

const NotesScreen = ({ navigation }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  const handleCreateNote = () => {
    setEditingNoteId(null);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
    setModalVisible(true);
  };

  const handleEditNote = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setNewNoteTitle(note.title);
      setNewNoteContent(note.content);
      setNewNoteTags(note.tags.join(', '));
      setModalVisible(true);
    }
  };

  const handleSaveNote = () => {
    if (!newNoteTitle.trim()) return;

    if (editingNoteId) {
      // Edit existing note
      setNotes(notes.map(note =>
        note.id === editingNoteId ? {
          ...note,
          title: newNoteTitle,
          content: newNoteContent,
          tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag)
        } : note
      ));
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        title: newNoteTitle,
        content: newNoteContent,
        created: new Date().toISOString(),
        tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      setNotes([newNote, ...notes]);
    }

    setModalVisible(false);
  };

  const renderNoteItem = ({ item }) => {
    const date = new Date(item.created);
    const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

    return (
      <TouchableOpacity 
        style={styles.noteCard}
        onPress={() => navigation.navigate('NoteDetail', { note: item })}
      >
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteContent} numberOfLines={2}>{item.content}</Text>
        
        <View style={styles.noteMetaRow}>
          <Text style={styles.noteDate}>{formattedDate}</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditNote(item.id)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <TouchableOpacity 
          style={styles.newButton}
          onPress={handleCreateNote}
        >
          <Text style={styles.newButtonText}>+ New Note</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notesList}
      />
      
      {/* Create/Edit Note Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingNoteId ? 'Edit Note' : 'Create Note'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#666"
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
            />
            
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Content"
              placeholderTextColor="#666"
              multiline={true}
              textAlignVertical="top"
              value={newNoteContent}
              onChangeText={setNewNoteContent}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Tags (comma separated)"
              placeholderTextColor="#666"
              value={newNoteTags}
              onChangeText={setNewNoteTags}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveNote}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  newButton: {
    backgroundColor: '#9b87f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
  },
  notesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  noteCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 12,
  },
  noteMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#9b87f5',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagBadge: {
    backgroundColor: 'rgba(155, 135, 245, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: '#9b87f5',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    marginBottom: 16,
  },
  contentInput: {
    minHeight: 120,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  cancelButtonText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#9b87f5',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotesScreen;
