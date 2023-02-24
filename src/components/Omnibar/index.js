import {
    useId,
    Input,
} from "@fluentui/react-components";
import * as React from "react";

import { PersonRegular } from "@fluentui/react-icons";
import { StyledOmnibar } from "./styles";

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

const Omnibar = ({ setResults, setLoading }) => {
    const beforeId = useId("content-before");
    const onChange = (event) => {
        onSearch(event.target.value);
    };
    const onSearch = debounce((value) => {
        if (!value) return setResults([]);
        console.log('search:', value);
        setLoading(true);
        fetch('http://localhost:2000/user/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ query: value }),
        })
            .then((response) => response.json())
            .then((data) => {
                const results = data.data.results;
                setResults(results);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    });
    return (
        <StyledOmnibar>
            <Input
                contentBefore={<PersonRegular />}
                id={beforeId}
                appearance="filled-darker"
                size="large"
                placeholder="Search Users"
                onChange={onChange}
            />
        </StyledOmnibar>
    );
};

export default Omnibar;