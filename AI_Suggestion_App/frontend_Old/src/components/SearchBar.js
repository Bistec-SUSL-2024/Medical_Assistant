import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SuggestionsDropdown from './SuggestionsDropdown';
import './SearchBar.css';

function SearchBar() {

// state Management - keeping track of the input value, suggestions, dropdown position, selected index, and cursor position 
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [cursorPosition, setCursorPosition] = useState(0);

    const [ghostText, setGhostText] = useState("");
    const [ghostPosition, setGhostPosition] = useState({ top: 0, left: 0 });
    const [navigationGhostText,setNavigationGhostText] = useState("");
    const ghostOverlayRef = useRef(null);

// References - Directly access to DOM elements
    const inputRef = useRef(null);
    const containerRef = useRef(null);

// Debounce Timeout - To debounce API calls
    const [suggestion, setSuggestion] = useState("");
    const debounceTimeout = useRef(null);

// Effect hooks - Automatically update the dropdown position when the window is resized

//Window Resize handler
    useEffect(() => {
        window.addEventListener('resize', updatePositions);
        return () => {
            window.removeEventListener('resize', updatePositions);
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);

//input change handler
    useEffect(() => {
        adjustTextareaHeight();
        updatePositions();
    }, [input]);

//scroll synchronization handler
useEffect(() => {
    const handleScroll = () => {
        if (inputRef.current && ghostOverlayRef.current) {
    // syncthe scroll poritions of both elements        
            ghostOverlayRef.current.scrollTop = inputRef.current.scrollTop;
            ghostOverlayRef.current.scrollLeft = inputRef.current.scrollLeft;
                updateGhostTextPosition(); // update the ghost text position
        }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
        inputElement.addEventListener('scroll', handleScroll, { passive: true });
        
        // cleanup function to remove the event listener
        return () => {
            if (inputElement) {
            inputElement.removeEventListener('scroll', handleScroll);
            }
        };
    }
}, []);

//  updatePositions - Update the dropdown and ghost text positions
    const updatePositions = () => {
        if (!inputRef.current) return;
        updateDropdownPosition();
        updateGhostTextPosition();
    };

    const syncScroll = () => {
        if(inputRef.current && ghostOverlayRef.current) {
            requestAnimationFrame(() => {
                ghostOverlayRef.current.scrollTop = inputRef.current.scrollTop;
                ghostOverlayRef.current.scrollLeft = inputRef.current.scrollLeft;
             });
        }
    };

// handleChange - Handle input change events
    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);
        setCursorPosition(e.target.selectionStart);
        setSelectedIndex(-1);
        setNavigationGhostText("");

        // Clear previous timeout
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        const { currentLine, currentLineStart } = getCurrentLineInfo(value, e.target.selectionStart);

        if (currentLine && currentLine.length > 0) {
            
            // Debounce API calls
            debounceTimeout.current = setTimeout(async () => {
                try {
                    const response = await axios.post('https://gpt2apiimg-388091007362.asia-south1.run.app/suggest', { 
                        input: currentLine 
                    });
                    
                    if (response.data.suggestions?.length > 0) {
                        setSuggestions(response.data.suggestions);
                        const suggestion = response.data.suggestions[0];
                        const ghostTextValue = suggestion.slice(currentLine.length);
                        setGhostText(ghostTextValue);
                        setSuggestion(value.slice(0, currentLineStart) + suggestion + 
                                    value.slice(currentLineStart + currentLine.length));
                    } else {
                        resetSuggestions();
                    }
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    resetSuggestions();
                } 
            }, 300); // 300ms debounce
        } else {
            resetSuggestions();
        }
    };
// resetSuggestions - Reset the suggestions and ghost text
    const resetSuggestions = () => {
        setSuggestions([]);
        setGhostText("");
        setSuggestion(input);
        setNavigationGhostText("");
    };
// Handling suggestion selection - Insert the selected suggestion into the input value
    const handleSuggestionClick = (suggestion) => {
        const { currentLineStart, currentLine } = getCurrentLineInfo(input, cursorPosition);
        const newInput = input.slice(0, currentLineStart) + suggestion + input.slice(currentLineStart + currentLine.length);
        const newCursorPosition = currentLineStart + suggestion.length;

        setInput(newInput);
        setSuggestions([]);
        setSelectedIndex(-1);
        setNavigationGhostText("");

        // Focus the input and set cursor position at the end
        if (inputRef.current) {
            inputRef.current.focus();
            setCursorPosition(newCursorPosition); 
            requestAnimationFrame(() => {
                inputRef.current.selectionStart = newCursorPosition;
                inputRef.current.selectionEnd = newCursorPosition;
            });
        }
    };
// Keyboard Controls - Handle Enter key, arrow keys, and suggestion selection
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && (ghostText|| navigationGhostText)) {
            e.preventDefault();
            const textToComplete =   navigationGhostText || suggestion;
            setInput(textToComplete);
            setCursorPosition(textToComplete.length);
            resetSuggestions();
        } else if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            const newValue = input.slice(0, cursorPosition) + '\n' + input.slice(cursorPosition);
            setInput(newValue);
            setCursorPosition(cursorPosition + 1);
            resetSuggestions();
            requestAnimationFrame(() => {
                if (inputRef.current) {
                    inputRef.current.selectionStart = cursorPosition + 1;
                    inputRef.current.selectionEnd = cursorPosition + 1;
                }
            });
        } else if (suggestions.length > 0) {
            handleSuggestionNavigation(e);
        }
    };

    const handleSuggestionNavigation = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                navigateSuggestions(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                navigateSuggestions(1);
                break;
            case 'Enter':
                if (selectedIndex !== -1) {
                    e.preventDefault();
                    handleSuggestionClick(suggestions[selectedIndex]);
                }
                break;
            default:
                break;
        }
    };

    const navigateSuggestions = (direction) => {
        setSelectedIndex(prevIndex => {
            const totalSuggestions = suggestions.length;
            const newIndex = (prevIndex + direction + totalSuggestions) % totalSuggestions;

            const { currentLineStart, currentLine } = getCurrentLineInfo(input, cursorPosition);
            const selectedSuggestion = suggestions[newIndex];

            const newNavigationText = input.slice(0, currentLineStart) + 
                          selectedSuggestion + 
                          input.slice(currentLineStart + currentLine.length);
            setNavigationGhostText(newNavigationText);

            return newIndex;
        });
    };

    const getCurrentLineInfo = (text, cursorPos) => {
        const lines = text.split('\n');
        let currentLineIndex = 0;
        let charCount = 0;
        let currentLineStart = 0;

        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + (i < lines.length - 1 ? 1 : 0); // Add 1 for newline except last line
            if (charCount + lineLength >= cursorPos) {
                currentLineIndex = i;
                break;
            }
            charCount += lineLength;
            currentLineStart = charCount;
        }

        return {
            currentLine: lines[currentLineIndex],
            currentLineStart: currentLineStart,
            currentLineIndex: currentLineIndex
        };
    };

    const updateDropdownPosition = () => {
        if (!inputRef.current || !containerRef.current) return;

        const inputRect = inputRef.current.getBoundingClientRect();
        const lineHeight = parseInt(getComputedStyle(inputRef.current).lineHeight);
        const { selectionStart, value, scrollTop } = inputRef.current;
        
        const { currentLineIndex, currentLine } = getCurrentLineInfo(value, selectionStart);
        
        const textWidth = getTextWidth(currentLine, getComputedStyle(inputRef.current));
        const cursorTop = (currentLineIndex * lineHeight) - scrollTop;

        const maxLeft = inputRect.width - 200; // Adjust dropdown width
        const left = Math.min(textWidth, maxLeft);

        setDropdownPosition({
            top: inputRect.top + window.scrollY + cursorTop + lineHeight,
            left: Math.max(0, left) // Ensure left is never negative
        });
    };

    const updateGhostTextPosition = () => {
        if (!inputRef.current) return;
        
        const { currentLineIndex } = getCurrentLineInfo(input, cursorPosition);
        const lineHeight = parseInt(getComputedStyle(inputRef.current).lineHeight);
        const scrollTop = inputRef.current.scrollTop;
        
        // Calculate the top position of the ghost text
        const topPosition = (currentLineIndex * lineHeight) - scrollTop;

        //set the ghost text position
        setGhostPosition({
            top: topPosition,
            left: 0
        });
    };

    const getTextWidth = (text, style) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = `${style.fontSize} ${style.fontFamily}`;
        return context.measureText(text).width;
    };

    const adjustTextareaHeight = () => {
        if (!inputRef.current) return;
        inputRef.current.style.height = 'auto';
    //    const maxHeight = 500; // Increase the maximum height
        const newHeight = Math.min(inputRef.current.scrollHeight, /*maxHeight*/);
        inputRef.current.style.height = `${newHeight}px`; // Adjust height based on content

        //Enable scrolling if content exceeds the maximum height
        if(inputRef.current.scrollHeight /*> maxHeight*/) {
            inputRef.current.style.overflowY = "scroll";
        } 
        else {inputRef.current.style.overflowY = "hidden";}
    };

    return (
        <div className="search-bar-container" ref={containerRef} style={{ position: "relative", display: "inline-flex", alignItems: "center", width: "100%" }}>
            <textarea
                ref={inputRef}
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onSelect={(e) => {
                    setCursorPosition(e.target.selectionStart);
                    updatePositions();
                }}
                onScroll={syncScroll}
                placeholder="Type something here..."
                className="search-bar"
                id="search-bar"
                style={{
                    position: "relative",
                    overflowY: 'auto',
                    zIndex: 2,
                    width: "100%",
                    resize: "none",
                    fontSize: "16px",
                    color: "#000",
                    background: "transparent",
                    boxSizing: "border-box",
                    fontFamily: "monospace",
                    lineHeight: "1.5",
                    
                }}
            />

            <div
                ref={ghostOverlayRef}
                className="ghost-text-overlay"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 1,
                    padding: "16px 16px",
                    boxSizing: "border-box",
                    color: "rgba(0, 0, 0, 0.3)",
                    whiteSpace: "pre-wrap",
                    overflowY: "hidden",
                    fontSize: "16px",
                    fontFamily: "monospace",
                    lineHeight: "1.5",
                    top:0,
                    left:0,
                }}
            >
                {navigationGhostText || suggestion}
            </div>

            {suggestions.length > 0 && (
                <SuggestionsDropdown
                    suggestions={suggestions}
                    onClick={handleSuggestionClick}
                    position={dropdownPosition}
                    selectedIndex={selectedIndex}
                />
            )}
        </div>
    );
}

export default SearchBar;