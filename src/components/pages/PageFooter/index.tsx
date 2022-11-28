import TailwindFooter from '@/components/example/TailwindFooter';
import css from './index.module.less';
export type PageFooterProps = {};

function PageFooter({}: PageFooterProps) {
  return (
    <footer className={css['wrapper']} aria-labelledby="footer-heading">
      <TailwindFooter />
    </footer>
  );
}

export default PageFooter;
