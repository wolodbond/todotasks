const { createPostGraphQLSchema } = require("postgraphile-core");
const { withPostGraphQLContext } = require("postgraphile");
const { graphql } = require("graphql");
const pg = require("pg");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

const express = require("express");
const router = express.Router();

// TODO: make propers env file/ PROCESS...
const databaseURL =
  "postgres://postgres:test_postgraph_pass@postgres_torba:5432/test_postgres_db";

// TODO: put const query and other functions to repository
router.get("/:user_id/tasks", async (req, res, next) => {
  const userId = req.params.user_id;
  const query = `{
    allTasks(
            filter:{
                    userId: {
                      equalTo: "${userId}"
                    }
                }) {
                  nodes {
                    id
                    title
                    body
                    taskStatus
                    userId
                  }
                }
        }`;

  const tasks = await execute(query, databaseURL);
  res.status(200).json(tasks);
});

async function performQuery(
  pgPool,
  schema,
  query,
  variables,
  jwtToken,
  operationName
) {
  return await withPostGraphQLContext(
    {
      pgPool
      //jwtToken: jwtToken,
      //jwtSecret: "...",
      //pgDefaultRole: "..."
    },
    async context => {
      return await graphql(
        schema,
        query,
        null,
        { ...context },
        variables,
        operationName
      );
    }
  );
}

async function execute(query, databaseURL, schemaName = "public") {
  const pgPool = new pg.Pool({ connectionString: databaseURL });
  const schema = await createPostGraphQLSchema(databaseURL, schemaName, {
    appendPlugins: [ConnectionFilterPlugin]
  });

  const result = await performQuery(pgPool, schema, query);
  return result;
}

module.exports = router;
//app.use("/api/v1/tasks", tasksRoutes);
/*
router.post("/:user_id/tasks", async (req, res, next) => {
  const userId = req.params.user_id;
  const taskPayload = req.body;

  const query = `{ 
                query:
                    mutation {
                        createTask(
                            input: {
                                id: "3"
                                title: "${taskPayload.title}"
                                body: "${taskPayload.body}"
                                taskStatus: "${taskPayload.taskStatus}"
                                userId: "${userId}"
                                createdDate: "2020-03-03"
                                updatedDate: "2020-03-03"
                            }
                        ) {
                            title
                            body
                            taskStatus
                            userId
                        }
                    } 
                } `;

  const tasks = await execute(query, databaseURL);
  res.status(200).json(tasks);
});

router.get("/", async (req, res, next) => {
  const query = `{
    allTasks {
      nodes {
        id
        title
        body
        taskStatus
      }
    }
  }`;

  const tasks = await execute(query, databaseURL);
  res.status(200).json(tasks);
});
*/
