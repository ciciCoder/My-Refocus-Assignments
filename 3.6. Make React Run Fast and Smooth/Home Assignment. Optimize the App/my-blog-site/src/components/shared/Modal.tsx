import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

type DialogPanel = JSX.IntrinsicElements['div'];

type ModalProps = DialogPanel & {
  show?: boolean;
  onClose?(): void;
};

const ModalBackground = React.memo(() => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-black bg-opacity-25" />
  </Transition.Child>
));

const Modal = React.memo((props: ModalProps) => {
  const { show, children, onClose, ...attrs } = props;
  const [isOpen, setIsOpen] = useState(show ?? false);

  useEffect(() => {
    setIsOpen(show ?? false);
  }, [show]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const afterLeave = useCallback(() => {
    onClose?.();
  }, []);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <ModalBackground />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                afterLeave={afterLeave}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <div
                    className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                    {...attrs}
                  >
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

export default Modal;
