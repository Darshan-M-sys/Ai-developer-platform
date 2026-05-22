# Define the graph as an adjacency list
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
}

# Function to perform DFS
def dfs(node, visited):
    if node not in visited:
        print(node)  # Process the node (e.g., print it)
        visited.add(node)  # Mark the node as visited
        for neighbor in graph[node]:  # Explore neighbors
            dfs(neighbor, visited)

# Set to keep track of visited nodes
visited = set()

# Start DFS from node 'A'
dfs('A', visited)
