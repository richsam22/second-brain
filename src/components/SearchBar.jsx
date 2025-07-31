import { Form } from 'react-bootstrap';
import { useSettings } from '../contexts/SettingsContext';

const SearchBar = ({ value, onChange }) => {
  const { t } = useSettings();
  return (
    <Form.Control
      type="text"
      placeholder={`🔍 ${t('searchPlaceholder')}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-3 search-bar"
    />
  );
};

export default SearchBar;
