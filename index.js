function bfs(rootNode, vertices, edges){
  //starting with the rootNode, we want to plug that into the findAdjacent nodes function, along with the vertices and edges
  //this gives you the adjacent vertices
  // you set a variable = to the findAdjacent function
  //you then need to call the function again recursively until findAdjacent returns []
  // if it returns [] then you want to call
  rootNode.distance = 0;
  let discovered = [rootNode];
  let discoverOrder = [rootNode];
  while(discovered.length !== 0) {
    let currentNode = discovered.shift()
    let adjNodes = findAdjacent(currentNode.name, vertices, edges)
    discoverOrder = discoverOrder.concat(adjNodes);
    markDistanceAndPredecessor(currentNode, adjNodes);
    discovered = discovered.concat(adjNodes);
  }
  return discoverOrder;
}

function findAdjacent(rootNode, vertices, edges) {
  let adjEdges = []
  let adjNodes = []
  let adjVertices = []
  for (let edge of edges) {
    if (edge.includes(rootNode)) {
      adjEdges.push(edge)
    }
  }
  for (let pair of adjEdges) {
    let idx = pair.indexOf(rootNode)
    if (idx === 0) {
      adjNodes.push(pair[1])
    } else {
      adjNodes.push(pair[0])
    }
  }
  for (let node of adjNodes) {
    vertices.forEach(vertex => {
      if (vertex.name === node && vertex.distance === null) {
        adjVertices.push(vertex)
      }
    })
  }
  return adjVertices;
}

function markDistanceAndPredecessor(rootNode, adjacentNodes) {
  //first loop through the adjacent nodes
  //then change each adjacent nodes distance to rootNode.distance + 1
  //and also the predecessor of each to the rootNode.name
  return adjacentNodes.map(node => {
    node.distance = rootNode.distance + 1;
    node.predecessor = rootNode;
  })
}
