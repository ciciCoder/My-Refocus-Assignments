import React, { useEffect, useId, useRef } from 'react';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import { IBlogPost } from '../../hooks/useBlogPost';

export type IBlogPostEditProps = IBlogPost & { index: number };

type BlogFormProps = Omit<JSX.IntrinsicElements['form'], 'onSubmit'> & {
  editProps?: IBlogPostEditProps;
  onSubmit(inputs: IBlogPost): void;
  onUpdate(index: number, inputs: IBlogPost): void;
  onCancel(): void;
};

export default function BlogForm(props: BlogFormProps) {
  const { onSubmit, onUpdate, onCancel, editProps, ...attrs } = props;
  const id = useId();
  const form = useRef<HTMLFormElement>(null);

  const setInputValues = (params: IBlogPost) => {
    if (!form.current) throw new Error('form not found');
    const { bookTitle, author, content, date } = form.current;
    bookTitle.value = params.title;
    author.value = params.author;
    content.value = params.content;
    date.value = params.date;
  };

  const getInputValues = (): IBlogPost => {
    if (!form.current) throw new Error('form not found');
    const { bookTitle, author, content, date } = form.current;
    return {
      title: bookTitle.value,
      author: author.value,
      content: content.value,
      date: date.value,
    };
  };

  useEffect(() => {
    setInputValues({
      title: editProps?.title ?? '',
      author: editProps?.author ?? '',
      date: editProps?.date ?? '',
      content: editProps?.content ?? '',
    });
  }, [editProps]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const inputs = getInputValues();

    (() => {
      if (!editProps) return onSubmit?.(inputs);
      onUpdate?.(editProps.index, inputs);
    })();

    setInputValues({
      title: '',
      author: '',
      date: '',
      content: '',
    });
  };

  return (
    <form ref={form} {...attrs} onSubmit={submitHandler}>
      <div className="card flex flex-col gap-3 p-3 max-w-md mx-auto mb-3 shadow-md">
        <Input id={`${id}-title`} name="bookTitle" label="Title" required />
        <Input id={`${id}-author`} name="author" label="Author" required />
        <Input
          id={`${id}-date`}
          name="date"
          type="date"
          label="Date"
          required
        />
        <TextArea
          id={`${id}-content`}
          name="content"
          label="Content"
          required
        ></TextArea>
        {!editProps ? (
          <button className="btn btn-primary">Submit</button>
        ) : (
          <>
            <button className="btn btn-warning">Update</button>
            <button className="btn btn-danger" type="button" onClick={onCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
}
