import {ReactNode} from 'react';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import './TodoItem.css';
import {MdDelete} from 'react-icons/md';

type CheckboxProps = Parameters<typeof Checkbox>[0];

interface TodoItemProps {
  key: number;
  item: string;
  isComplete: boolean;
  onComplete?: CheckboxProps['onChange'];
  onDelete?: (key: number) => void;
  buttonSlot?: ReactNode;
}

export default function TodoItem({
  key,
  item,
  isComplete,
  buttonSlot,
  onComplete,
  onDelete,
}: TodoItemProps) {
  const onDeleteHandler: React.DOMAttributes<HTMLButtonElement>['onClick'] =
    e => {
      onDelete?.(key);
    };

  return (
    <div className="TodoItem">
      <Checkbox
        label={item}
        checked={isComplete}
        onChange={onComplete}
        lineThroughLabel
      ></Checkbox>
      <Button
        slotContent={
          buttonSlot ?? <MdDelete color="#EF5350" size={20}></MdDelete>
        }
        onClick={onDeleteHandler}
      ></Button>
    </div>
  );
}
