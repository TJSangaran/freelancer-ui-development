import { useState } from 'react'
import {
    Box,
    Chip,
    InputBase,
} from '@mui/material'
import styles from './TagField.module.css'

const TagField = ({ tags, onTagChange }) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState()

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleKeyDown = e => {
        if (!value && e.key === "Backspace") {
            const _tags = [...tags]
            _tags.pop()
            setError()
            onTagChange(_tags)
        }
        if (e.key !== "Enter") return
        e.preventDefault()
        e.stopPropagation()
        if (!value) return
        if (tags.length > 10) {
            return setError("You can only add up to ten tags")
        }
        onTagChange(Array.from(new Set([...tags, value])))
        setValue('')
        return false
    }

    const onTagRemove = tag => {
        setError()
        onTagChange(tags.filter(_tag => _tag !== tag))
    }

    return (
        <Box>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ mt: 1 }} className={`${styles.inputBox} ${error ? styles.inputError : ''}`}>
                    <div>
                        {tags.map(tag => (
                            <Chip sx={{ m: 0.5 }} key={tag} label={tag} onDelete={() => onTagRemove(tag)} />
                        ))}
                    </div>
                    <InputBase
                        className={styles.inputEle}
                        name="tagInput"
                        label="Tags"
                        type="text"
                        id="tagInput"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Tags"
                    />
                </Box>
            </Box>
            <p className={`${styles.helperText} ${error ? styles.helperError : ''}`}>{error || "Type and press enter"}</p>
        </Box>
    );
}

export default TagField;