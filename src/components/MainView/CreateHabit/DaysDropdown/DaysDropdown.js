import React, { useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DaysDropdown = () => {
    const [show, setShow] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const daysOfWeek = [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' },
    ];

    const handleCheckboxChange = (value) => {
        const newSelectedOptions = selectedOptions.includes(value)
            ? selectedOptions.filter((option) => option !== value)
            : [...selectedOptions, value];
        const order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const sortedOptions = newSelectedOptions.sort((a, b) => order.indexOf(a) - order.indexOf(b));

        setSelectedOptions(sortedOptions);
    };

    return (
        <>
            <FormControl
                type="text"
                value={selectedOptions.join(', ') || 'Select Days'}
                readOnly
                onClick={() => setShow(!show)}
                placeholder="Select Days"
                style={{ cursor: 'pointer', padding: '10px' }}
            />
            {show && (
                <Dropdown show={show} onMouseLeave={() => setShow(false)}>
                    <Dropdown.Menu>
                        {daysOfWeek.map((option) => (
                            <Dropdown.Item key={option.value} as="div">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option.value)}
                                    onChange={() => handleCheckboxChange(option.value)}
                                    style={{ marginRight: '10px' }}
                                />
                                {option.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </>
    );
};

export default DaysDropdown;