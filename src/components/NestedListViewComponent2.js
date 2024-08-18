import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import NestedListView from "react-native-nested-listview";

/**
 * Function to decorate the data with level and key properties.
 */
const decorateDataWithLevelAndKeys = (node, path = [], level = 0) => {
  const key = [...path, node.name].join('-');
  const decoratedNode = { ...node, level, key };

  if (node.children) {
    decoratedNode.children = Object.entries(node.children).reduce((acc, [childKey, childNode]) => {
      acc[childKey] = decorateDataWithLevelAndKeys(childNode, [...path, node.name], level + 1);
      return acc;
    }, {});
  }

  return decoratedNode;
};
const generateMultipleChildren = (numChildren) => {
  const children = {};
  for (let i = 0; i <= numChildren; i++) {
    const childName = `child${i}`;
    children[childName] = {
      name: `Main Child ${i}`,
      children: {
        child1: { name: "Sub Child 1", children: {
          subchild1: { name: "Sub sub Child 1", children: {} }
        } },
        child2: { name: "Sub Child 2", children: {} },
      },
    };
  }
  return children;
};
// Initialize data with levels and keys
const initialData = [
  decorateDataWithLevelAndKeys({
    name: "Main Parent",
    children: generateMultipleChildren(1000),
  })
];

const colorLevels = {
  0: "white",
  1: "blue",
  2: "green",
  3: "red",
};

const NestedListViewComponent2 = () => {
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const renderNode = (node) => {
    const paddingLeft = (node.level + 1) * 20;
    const backgroundColor = colorLevels[node.level] || 'white';

    return (
      <View key={node.key} style={[styles.node, { backgroundColor, paddingLeft }]}>
        <Text>{node.name}</Text>
      </View>
    );
  };

  const onNodePressed = (node) => {
    // Alert.alert(node?.name);
  };

  const getChildrenName = (_) => {
    return "children";
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      setExpandedNodes([]);
    } else {
      const allNodes = [];

      const collectAllNodes = (node) => {
        allNodes.push(node);
        if (node.children) {
          Object.values(node.children).forEach(child => collectAllNodes(child));
        }
      };

      initialData.forEach(rootNode => collectAllNodes(rootNode));
      setExpandedNodes(allNodes);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Button title={isExpanded ? "Collapse All" : "Expand All"} onPress={handleToggleExpand} />
      <NestedListView
        data={expandedNodes.length ? expandedNodes : initialData}
        getChildrenName={getChildrenName}
        onNodePressed={onNodePressed}
       
        renderNode={renderNode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgb(255, 255, 255)", padding: 15 },
  node: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(0, 0, 0)",
    marginVertical: 5,
  },
});

export default NestedListViewComponent2;
