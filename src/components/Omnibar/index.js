import React, { useState } from 'react';
import { StyledSelect } from './styles';

const debounce = (func) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, 1000);
    };
};

const OmniBar = () => {
    const [results, setResults] = useState([]);
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = debounce((value) => {
        if (!value) return setResults([]);
        console.log('search:', value);
        fetch('http://localhost:2000/user/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 7e61207bbdd266d1dde62c2b26a9bd5bbae72423'
            },
            body: JSON.stringify({ query: value }),
        })
            .then((response) => response.json())
            .then((data) => {
                const results = data.data.results.map(
                    (result) => ({
                        label: `${result.firstName} ${result.lastName} (${result.username})`, value: result._id
                    })
                );
                setResults(results);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
    return <div className="search">
        <StyledSelect
            showSearch
            showArrow={false}
            placeholder="Search"
            optionFilterProp="children"
            size="large"
            style={{ width: 400 }}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={results}
        />
    </div>
};

export default OmniBar;