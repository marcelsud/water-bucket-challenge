# Water Bucket Challenge 💦

Welcome to the Water Bucket Challenge API! This NestJS-based service helps you calculate the steps required to reach a specific target volume using two buckets with given capacities.

## 🚀 Quickstart

The first step is to clone the repository:

```bash
git clone https://github.com/marcelsud/water-bucket-challenge.git
cd water-bucket-challenge
```

### <a name="docker-compose"></a>Option 1: Running the service with Docker Compose

Requirements:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

You can use the following command to start the service on port 3000:

```bash
docker-compose up
```

### <a name="locally"></a>Option 2: Running the service locally (Node.js LTS required)

```
💡 If the environment variables `REDIS_HOST` and `REDIS_PORT` are not set, the service will run without Redis cache.
```

To run the service locally, you need to install the dependencies using the following command:

```bash
npm install
```

Then, you can start the service using the following command:

```bash
npm run start
```

To run the service with Redis cache, you need to set the environment variables `REDIS_HOST` and `REDIS_PORT`:

```bash
docker run -d -p 6379:6379 redis/redis-stack:edge
REDIS_HOST=localhost REDIS_PORT=6379 npm run start
```

## 🧪 Unit Tests

To run the unit tests, you can use the following command:

```bash
npm run test
```

## 📘 API Documentation

### Endpoint Information

- **URL**: `/api/v1/calculate-steps`
- **Method**: `POST`
- **Description**: Calculate the steps to achieve a target volume using two buckets with specific capacities.

### Request Format

- **Content-Type**: `application/json`
- **Body Parameters**:
  - `x_capacity`: Capacity of the first bucket (integer, required, >0).
  - `y_capacity`: Capacity of the second bucket (integer, required, >0).
  - `z_amount_wanted`: The target volume (integer, required, >0).

### Response Format

- **Content-Type**: `application/json`
- **Fields**:
  - `solution`: A list of steps to achieve the target. Each step includes:
    - `step`: Step number (integer).
    - `bucketX`: Volume in the first bucket after the action (integer).
    - `bucketY`: Volume in the second bucket after the action (integer).
    - `action`: Description of the action taken (string).
    - `status`: Status of the action (string, optional).

### HTTP Status Codes

- **200 OK**: Successful request; the solution is returned.
- **400 Bad Request**: Invalid request parameters; response contains the error message.
- **422 Unprocessable Entity**: No solution found for the given parameters.
- **500 Internal Server Error**: Unexpected server error; the response has a general error message.

### Request Example

```json
POST /api/v1/calculate-steps
{
  "x_capacity": 2,
  "y_capacity": 10,
  "z_amount_wanted": 4
}
```

### Response Example

```json
{
  "solution": [
    {
      "step": 1,
      "bucketX": 2,
      "bucketY": 0,
      "action": "Fill bucket X"
    },
    {
      "step": 2,
      "bucketX": 0,
      "bucketY": 2,
      "action": "Transfer from bucket X to bucket Y"
    },
    {
      "step": 3,
      "bucketX": 2,
      "bucketY": 2,
      "action": "Fill bucket X"
    },
    {
      "step": 4,
      "bucketX": 0,
      "bucketY": 4,
      "action": "Transfer from bucket X to bucket Y",
      "status": "Solved"
    }
  ]
}
```

### No Solution Response Example

```json
{
  "statusCode": 422,
  "message": "No Solution"
}
```

## 🧠 Algorithm explanation

To solve the water bucket challenge, I chose the Breadth-First Search (BFS) which is a common algorithm used in graph and tree traversal. It explores nodes layer-by-layer, starting from a given source, visiting each node's neighbors, then the neighbors' neighbors, and so on. The exploration continues until it finds the target or exhausts all possibilities.

### BFS Operation

1. _Initialization_: BFS starts with a "source" node and uses a queue to keep track of nodes to visit.
2. _Exploration_: It dequeues the front node from the queue, visits it, and enqueues its neighbors (unvisited nodes connected to the current node).
3. _Repetition_: This process repeats until the queue is empty or the target is found.

### BFS for this Challenge

- _Graph Representation_: The states of the two buckets can be thought of as nodes in a graph, with transitions (actions like "fill," "empty," or "transfer") representing edges.
- _Starting State_: The initial state is where both buckets are empty.
- _Target State_: A state where one or both buckets have the desired volume.
- _Traversal_: BFS begins at the initial state and explores all possible moves (edges) to reach new states (nodes). It continues to explore each subsequent state while ensuring it doesn't revisit previously explored states (avoid loops).
- _Solution_: If the target state is found, BFS uses the "rewind" method to trace the path from the target back to the start, providing a series of steps leading to the target.

## 📚 References

- [Breadth-First Search (BFS) Algorithm](https://en.wikipedia.org/wiki/Breadth-first_search)
- [Graph Traversal](https://en.wikipedia.org/wiki/Graph_traversal)
- [Shortest Path Problem](https://en.wikipedia.org/wiki/Shortest_path_problem)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Jest Documentation](https://jestjs.io/docs/en/getting-started)
- [Redis Documentation](https://redis.io/documentation)
- [Docker Documentation](https://docs.docker.com/)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
