import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { ImcompleteTodos } from "./components/ImcompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setincompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);

  // テキスト変更時のイベント
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン押下時イベント
  const onClickAddButton = () => {
    if (todoText === "") return;
    const newTodo = [...incompleteTodos, todoText];
    // 配列に設定
    setincompleteTodos(newTodo);
    // TOdoテキストの初期化
    setTodoText("");
  };

  // 削除ボタン押下イベント
  const onClickDelete = (index) => {
    // 対象の未完了のリストを１つ削除する
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    // 新しい配列を設定する
    setincompleteTodos(newTodos);
  };

  // 完了ボタン押下時イベント
  const onClickComplete = (index) => {
    // 対象の未完了のリストを１つ削除する
    const newincompleteTodos = [...incompleteTodos];
    newincompleteTodos.splice(index, 1);

    // 完了のリストを１つ追加する（既にある完了リスト　＋　対象の未完了リスト）
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setincompleteTodos(newincompleteTodos);
    setcompleteTodos(newCompleteTodos);
  };

  // 戻すボタン押下時イベント
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newincompleteTodos = [...incompleteTodos, completeTodos[index]];
    setcompleteTodos(newCompleteTodos);
    setincompleteTodos(newincompleteTodos);
  };

  return (
    <React.Fragment>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAddButton}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodoは5個まで！消化して！</p>
      )}
      <ImcompleteTodos
        todo={incompleteTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
      <CompleteTodos todo={completeTodos} onClickBack={onClickBack} />
    </React.Fragment>
  );
};
