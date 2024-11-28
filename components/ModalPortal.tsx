import ReactDOM from 'react-dom';

type Props = { children: React.ReactNode };

export default function ModalPortal({ children }: Props) {
  const element = document.getElementById('modal') as HTMLElement;
  return ReactDOM.createPortal(children, element);
}
