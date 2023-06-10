import { useReducer } from 'react';

export interface IBlogPost {
  title: string;
  author: string;
  content: string;
  date: string;
}

type State = IBlogPost[];

const blogPostApi: IBlogPost[] = [
  {
    title: 'Introduction to JavaScript',
    author: 'John Doe',
    date: '2022-05-15',
    content: 'This article provides an introduction to JavaScript programming.',
  },
  {
    title: 'CSS Tips and Tricks',
    author: 'Jane Smith',
    date: '2022-06-10',
    content:
      'Discover some useful CSS tips and tricks to enhance your web designs.',
  },
  {
    title: 'The Power of React',
    author: 'David Johnson',
    date: '2022-07-25',
    content:
      'Learn about the benefits and features of React for building interactive UIs.',
  },
  {
    title: 'Getting Started with Node.js',
    author: 'Emily Brown',
    date: '2022-08-20',
    content:
      "A beginner's guide to getting started with Node.js and server-side JavaScript.",
  },
  {
    title: 'Mastering HTML5 Canvas',
    author: 'Michael Anderson',
    date: '2022-09-15',
    content:
      'Learn advanced techniques for creating interactive graphics using HTML5 Canvas.',
  },
  {
    title: 'Responsive Web Design Best Practices',
    author: 'Sophia Roberts',
    date: '2022-10-10',
    content:
      'Explore the best practices for creating responsive web designs that work across devices.',
  },
  {
    title: 'JavaScript Data Structures and Algorithms',
    author: 'Daniel Smith',
    date: '2022-11-05',
    content:
      'An in-depth look at various data structures and algorithms in JavaScript.',
  },
  {
    title: 'Introduction to CSS Grid Layout',
    author: 'Olivia Johnson',
    date: '2022-12-01',
    content:
      'Learn how to create complex grid layouts using CSS Grid for modern web design.',
  },
  {
    title: 'Building RESTful APIs with Express',
    author: 'William Davis',
    date: '2023-01-01',
    content:
      'A comprehensive guide to building RESTful APIs using the Express framework in Node.js.',
  },
  {
    title: 'Web Accessibility: Making the Web Inclusive',
    author: 'Sophie Wilson',
    date: '2023-02-01',
    content:
      'Discover the importance of web accessibility and how to make your websites more inclusive.',
  },
];

const initialState: State = [];

const ACTIONS = Object.freeze({
  FETCH: 'fetch',
  STORE: 'store',
  UPDATE: 'update',
  DELETE: 'delete',
});

type Payloads = {
  store: IBlogPost;
  update: { index: number; values: IBlogPost };
  delete: number;
};

type ActionTypes = typeof ACTIONS;

type Action =
  | { type: ActionTypes['FETCH'] }
  | { type: ActionTypes['STORE']; payload: Payloads[ActionTypes['STORE']] }
  | { type: ActionTypes['UPDATE']; payload: Payloads[ActionTypes['UPDATE']] }
  | { type: ActionTypes['DELETE']; payload: Payloads[ActionTypes['DELETE']] };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ACTIONS.FETCH: {
      return [...blogPostApi];
    }
    case ACTIONS.STORE: {
      const blogpost = action.payload as Payloads['store'];
      return [...state, blogpost];
    }
    case ACTIONS.UPDATE: {
      const { index, values } = action.payload as Payloads['update'];
      if (index == null || values == null)
        throw new Error(
          'payload: attributes index and values is required on update action'
        );
      const stateClone = [...state];
      stateClone[index] = values;
      return stateClone;
    }
    case ACTIONS.DELETE: {
      const index = action.payload as Payloads['delete'];
      if (typeof index !== 'number')
        throw new Error('payload: must be a number on delete action');
      const stateClone = [...state];
      stateClone.splice(index, 1);
      return [...stateClone];
    }
    default:
      return [...state];
  }
}

export default function useIBlogPost(): [State, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
