"use client"

import type { AppProps } from "next/app";
import {ApolloClient, InMemoryCache, createHttpLink, useQuery, useMutation} from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import {CreateTodoDocument, CreateTodoMutation, GetTodoDocument, GetTodoQuery} from "../../graphql/dist/client";
import gql from "graphql-tag";

function MyApp() {
  const { data } = useQuery<GetTodoQuery>(GetTodoDocument);

    const [login, { loading, error }] = useMutation<CreateTodoMutation>(CreateTodoDocument,{
      update(cache, {data}){
        const newTask = data?.createTodo; // ミューテーションのレスポンス
        const cachedTasks = cache.readQuery({
                  query: GetTodoDocument,
        });
        if (newTask && cachedTasks) {
                  // FETCH_ALL_TASKSのキャッシュに新規タスクを追加
                  // @ts-ignore
                  cache.writeQuery({
                      query: GetTodoDocument,
                      data: {
                          todos: [...cachedTasks?.todos, newTask]
                      },
                  });
              }
      }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (

      <div style={{margin: "0 auto", width: "1000px"}}>
          <button onClick={()=>login()}> test</button>
        {data?.todos?.map((todo) => (
            <div key={todo.id}>
              <h1>{todo.text}</h1>
              <p>id:{todo.id}</p>
              <p>text:{todo.text}</p>
            </div>
        ))}
      </div>
  );
}

export default MyApp;
