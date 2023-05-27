import useSelector from './use-selector';

export default function useTranslation(section) {
  return useSelector((state) => state.language.translation[section]);
}
