/* eslint-disable react/no-unescaped-entities */
"use client"
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'What is Taskify?',
    children: <p>Taskify is a task management application designed to help users organize their daily tasks, prioritize work, and improve productivity. It's a user-friendly tool that streamlines task management for individuals and teams.</p>,
  },
  {
    key: '2',
    label: 'How can I get started with Taskify?',
    children: <p>To get started with Taskify, visit our website or download the Taskify app from your device's app store. Once installed, create an account, and you can start managing your tasks immediately.</p>,
  },
  {
    key: '3',
    label: 'Is Taskify available on multiple platforms?',
    children: <p>Is Taskify available on multiple platforms?</p>,
  },
  {
    key: '4',
    label: 'What features does Taskify offer for task management?',
    children: <p>What features does Taskify offer for task management?</p>,
  },
  {
    key: '5',
    label: 'Can I use Taskify for team collaboration?',
    children: <p>Yes, Taskify offers collaboration features that allow you to share tasks and projects with team members. You can assign tasks, leave comments, and monitor the progress of shared projects.</p>,
  },
];

const Faq: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="my-20 flex justify-center items-center flex-col">
    <div className="text-center flex-col gap-10">
      <p className="text-3xl font-bold mb-6">Frequently Asked Questions</p>
      <h1 className="text-sm text-light-black">Seamlessly use your preferred tools for unified work, start to finish.
</h1>
    </div>
    <div className="mt-10 max-w-4xl mx-auto w-full gap-4">
    <Collapse expandIconPosition='end' items={items}  onChange={onChange} />
    </div>
  </div>
  );
};

export default Faq;