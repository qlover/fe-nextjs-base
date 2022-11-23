import useTranslation from '@/hooks/useTranslation';
import css from './index.module.less';
export type PageFooterProps = {};

function PageFooter({}: PageFooterProps) {
  const { t: commonT } = useTranslation('common');
  const companyAddress = commonT('company_address');

  return (
    <footer className={css['wrapper']} aria-labelledby="footer-heading">
      <div className="ui-container max-w-[1640px] m-auto pt-14"></div>
    </footer>
  );
}

export default PageFooter;
