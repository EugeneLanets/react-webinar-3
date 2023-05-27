import useSelector from '../../store/use-selector';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

function LangSwitcher({ onLangChange }) {
  const select = useSelector((state) => ({
    languages: state.language.allLanguages,
    currentLanguage: state.language.currentLanguage,
  }));
  const cn = bem('LangSwitcher');
  return (
    <div className={cn()}>
      {select.languages.map((lang) => (
        <button
          disabled={select.currentLanguage === lang}
          type={'button'}
          className={cn('item')}
          onClick={() => onLangChange(lang)}
          key={lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

LangSwitcher.propTypes = {
  onLangChange: propTypes.func,
};

export default LangSwitcher;
