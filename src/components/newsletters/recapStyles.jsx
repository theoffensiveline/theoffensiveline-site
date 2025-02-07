import { ColorConstants } from '../constants/ColorConstants.ts';

export const TeamDropdown = ({ data, onSelectTeam }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <select
                onChange={(e) => onSelectTeam(e.target.value)}
                style={{
                    padding: '5px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid ' + ColorConstants.text,
                    width: '300px',
                    margin: '10px auto',
                }}
            >
                <option value="">Select Team</option>
                {data.map((item, index) => (
                    <option key={index} value={item.team_name}>
                        {item.team_name}
                    </option>
                ))}
            </select>
        </div >
    );
};

// Styled component for the slider
export const StyledSlider = ({ value, onChange, min, max }) => (
    <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{
            width: '300px',
            margin: '0 auto',
            display: 'block',
            center: 'true',
        }}
    />
);

export * from './tableStyles.jsx';
export * from './chartStyles.jsx';
