import TodoItem from './TodoItem';
import './TodoList.css';
import 'animate.css';

type TodoItemProps = Parameters<typeof TodoItem>[0];

interface TodoListProps {
  items: {
    id: number;
    item: string;
    isComplete: boolean;
  }[];
  updateList?: (list: TodoListProps['items']) => void;
}

export default function TodoList({items, updateList}: TodoListProps) {
  const onCompleteHandler =
    (index: number): TodoItemProps['onComplete'] =>
    isComplete => {
      const cloneItems = [...items];
      cloneItems[index].isComplete = isComplete;
      updateList?.(cloneItems);
    };

  const onDeleteHandler: TodoItemProps['onDelete'] = index => {
    const cloneItems = [...items];
    cloneItems.splice(index, 1);
    updateList?.(cloneItems);
  };
  return (
    <div className="TodoList">
      {items.map((item, index) => (
        <div
          className="animate__animated animate__fadeInRight"
          style={{animationDelay: `${index * 0.2}s`}}
        >
          <TodoItem
            key={index}
            item={item.item}
            isComplete={item.isComplete}
            onComplete={onCompleteHandler(index)}
            onDelete={onDeleteHandler}
          />
          {index !== items.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}
