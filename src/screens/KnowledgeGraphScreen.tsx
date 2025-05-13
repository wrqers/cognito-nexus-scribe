
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

const KnowledgeGraphScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('physics');
  
  const categories = [
    { id: 'physics', name: 'Physics' },
    { id: 'ai', name: 'AI' },
    { id: 'philosophy', name: 'Philosophy' },
    { id: 'biology', name: 'Biology' },
  ];
  
  // Simple mock data for nodes
  const getNodes = () => {
    switch (selectedCategory) {
      case 'physics':
        return [
          { id: 'p1', label: 'Quantum Physics', x: 100, y: 100, color: '#1EAEDB' },
          { id: 'p2', label: 'Wave Function', x: 200, y: 150, color: '#1EAEDB' },
          { id: 'p3', label: 'Superposition', x: 150, y: 200, color: '#1EAEDB' },
          { id: 'p4', label: 'Relativity', x: 250, y: 100, color: '#1EAEDB' },
        ];
      case 'ai':
        return [
          { id: 'ai1', label: 'Machine Learning', x: 100, y: 100, color: '#9b87f5' },
          { id: 'ai2', label: 'Neural Networks', x: 200, y: 150, color: '#9b87f5' },
          { id: 'ai3', label: 'Deep Learning', x: 150, y: 200, color: '#9b87f5' },
        ];
      case 'philosophy':
        return [
          { id: 'ph1', label: 'Epistemology', x: 100, y: 100, color: '#4CAF50' },
          { id: 'ph2', label: 'Metaphysics', x: 200, y: 150, color: '#4CAF50' },
          { id: 'ph3', label: 'Ethics', x: 150, y: 200, color: '#4CAF50' },
        ];
      case 'biology':
        return [
          { id: 'b1', label: 'Genetics', x: 100, y: 100, color: '#FFC107' },
          { id: 'b2', label: 'Cell Biology', x: 200, y: 150, color: '#FFC107' },
          { id: 'b3', label: 'Ecology', x: 150, y: 200, color: '#FFC107' },
        ];
      default:
        return [];
    }
  };

  // Simple mock data for edges
  const getEdges = () => {
    const nodes = getNodes();
    if (nodes.length < 2) return [];
    
    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        from: nodes[i].id,
        to: nodes[i + 1].id,
      });
    }
    
    return edges;
  };
  
  const renderGraph = () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    return (
      <Svg height="300" width="100%">
        {edges.map((edge, index) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <Line
              key={`edge-${index}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#555"
              strokeWidth="2"
            />
          );
        })}
        
        {nodes.map((node) => (
          <React.Fragment key={node.id}>
            <Circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={node.color}
              opacity="0.7"
            />
            <SvgText
              x={node.x}
              y={node.y + 5}
              fontSize="10"
              fill="white"
              textAnchor="middle"
            >
              {node.label.split(' ')[0]}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Knowledge Graph</Text>
        <TouchableOpacity 
          style={styles.newButton}
          onPress={() => navigation.navigate('KnowledgeGraphDetail', { mode: 'create' })}
        >
          <Text style={styles.newButtonText}>+ New Graph</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.graphContainer}>
        {renderGraph()}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Knowledge Graph
        </Text>
        <Text style={styles.detailsDescription}>
          This graph visualizes key concepts and their relationships in the field of {selectedCategory}.
        </Text>
        
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
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
  categoryScroll: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
  },
  categoryButtonActive: {
    backgroundColor: '#9b87f5',
  },
  categoryText: {
    color: '#9b87f5',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  graphContainer: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    borderRadius: 12,
    height: 300,
    marginBottom: 16,
    overflow: 'hidden',
  },
  detailsContainer: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  detailsDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#9b87f5',
    fontWeight: '600',
  },
});

export default KnowledgeGraphScreen;
