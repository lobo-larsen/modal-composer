// Music Theory Data and Logic

// Note mapping
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const noteAliases = {
    'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
};

// Audio Context for playing chords
let audioContext = null;

// Initialize audio context (lazy initialization to avoid autoplay issues)
function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Convert note to frequency (A4 = 440Hz)
function noteToFrequency(note, octave = 4) {
    const noteIndex = notes.indexOf(note);
    const A4 = 440;
    const semitonesFromA4 = noteIndex - 9 + (octave - 4) * 12;
    return A4 * Math.pow(2, semitonesFromA4 / 12);
}

// Get notes in a chord
function getChordNotes(chordName) {
    // Extract root note and quality
    const root = chordName.replace(/m|°/g, '');
    const rootIndex = notes.indexOf(root);
    
    if (rootIndex === -1) return [];
    
    let intervals;
    if (chordName.includes('°')) {
        // Diminished: root, minor 3rd, diminished 5th
        intervals = [0, 3, 6];
    } else if (chordName.includes('m')) {
        // Minor: root, minor 3rd, perfect 5th
        intervals = [0, 3, 7];
    } else {
        // Major: root, major 3rd, perfect 5th
        intervals = [0, 4, 7];
    }
    
    return intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        return notes[noteIndex];
    });
}

// Play a chord
function playChord(chordName) {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 1.2; // seconds
    
    const chordNotes = getChordNotes(chordName);
    
    chordNotes.forEach((note, index) => {
        // Create oscillator for each note
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        // Use different octaves for better sound
        const octave = index === 0 ? 3 : 4; // Root lower, others higher
        const frequency = noteToFrequency(note, octave);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, now);
        
        // Envelope: attack and decay
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05); // Attack
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration); // Decay
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start(now);
        oscillator.stop(now + duration);
    });
}

// Mode definitions with characteristic chords
// Roman numerals indicate scale degrees, characteristic chords are marked
const modes = [
    {
        name: 'Ionian (Major)',
        description: 'The major scale - bright and stable',
        intervals: [0, 2, 4, 5, 7, 9, 11], // W-W-H-W-W-W-H
        chordQualities: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'],
        romanNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
        characteristicChords: [0, 3] // I and IV are most characteristic
    },
    {
        name: 'Dorian',
        description: 'Minor with raised 6th - jazzy and sophisticated',
        intervals: [0, 2, 3, 5, 7, 9, 10], // W-H-W-W-W-H-W
        chordQualities: ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj'],
        romanNumerals: ['i', 'ii', 'bIII', 'IV', 'v', 'vi°', 'bVII'],
        characteristicChords: [1, 3] // ii and IV are characteristic
    },
    {
        name: 'Phrygian',
        description: 'Minor with lowered 2nd - Spanish/flamenco sound',
        intervals: [0, 1, 3, 5, 7, 8, 10], // H-W-W-W-H-W-W
        chordQualities: ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min'],
        romanNumerals: ['i', 'bII', 'bIII', 'iv', 'v°', 'bVI', 'bvii'],
        characteristicChords: [1, 5] // bII and bVI are characteristic
    },
    {
        name: 'Lydian',
        description: 'Major with raised 4th - dreamy and floating',
        intervals: [0, 2, 4, 6, 7, 9, 11], // W-W-W-H-W-W-H
        chordQualities: ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min'],
        romanNumerals: ['I', 'II', 'iii', '#iv°', 'V', 'vi', 'vii'],
        characteristicChords: [1, 3] // II and #iv° are characteristic
    },
    {
        name: 'Mixolydian',
        description: 'Major with lowered 7th - bluesy and rock',
        intervals: [0, 2, 4, 5, 7, 9, 10], // W-W-H-W-W-H-W
        chordQualities: ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj'],
        romanNumerals: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'bVII'],
        characteristicChords: [0, 6, 4] // I, bVII, and v are characteristic
    },
    {
        name: 'Aeolian (Natural Minor)',
        description: 'The natural minor scale - melancholic and stable',
        intervals: [0, 2, 3, 5, 7, 8, 10], // W-H-W-W-H-W-W
        chordQualities: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
        romanNumerals: ['i', 'ii°', 'bIII', 'iv', 'v', 'bVI', 'bVII'],
        characteristicChords: [5, 6] // bVI and bVII are characteristic
    },
    {
        name: 'Locrian',
        description: 'Unstable diminished tonic - dark and tense',
        intervals: [0, 1, 3, 5, 6, 8, 10], // H-W-W-H-W-W-W
        chordQualities: ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min'],
        romanNumerals: ['i°', 'bII', 'biii', 'iv', 'bV', 'bVI', 'bvii'],
        characteristicChords: [0, 4] // i° and bV are characteristic
    }
];

// Generate scale notes for a given root and intervals
function generateScale(root, intervals) {
    const rootIndex = notes.indexOf(root);
    return intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        return notes[noteIndex];
    });
}

// Generate chord name from root note and quality
function getChordName(note, quality) {
    const qualitySymbols = {
        'maj': '',
        'min': 'm',
        'dim': '°'
    };
    return note + qualitySymbols[quality];
}

// Get chord quality class for styling
function getChordClass(quality) {
    if (quality === 'maj') return 'major-chord';
    if (quality === 'min') return 'minor-chord';
    if (quality === 'dim') return 'diminished-chord';
    return '';
}

// Generate all chords for a mode
function generateModeChords(tonality, mode) {
    const scale = generateScale(tonality, mode.intervals);
    const chords = [];
    
    for (let i = 0; i < scale.length; i++) {
        const note = scale[i];
        const quality = mode.chordQualities[i];
        const romanNumeral = mode.romanNumerals[i];
        const isCharacteristic = mode.characteristicChords.includes(i);
        
        chords.push({
            note: note,
            quality: quality,
            name: getChordName(note, quality),
            romanNumeral: romanNumeral,
            isCharacteristic: isCharacteristic,
            chordClass: getChordClass(quality)
        });
    }
    
    return chords;
}

// State for analyzer
let selectedChords = new Set();

// State for progression analyzer
let progressionChords = [];
let progressionKey = 'C';

// Render a single compact mode row
function renderModeRow(tonality, mode) {
    const chords = generateModeChords(tonality, mode);
    const shortName = mode.name.split(' ')[0]; // Get first word only
    
    const chordsHTML = chords.map(chord => `
        <div class="chord ${chord.chordClass} ${chord.isCharacteristic ? 'characteristic' : ''}" data-chord="${chord.name}">
            <div class="chord-name">${chord.name}</div>
            ${chord.isCharacteristic ? '<div class="star">★</div>' : ''}
        </div>
    `).join('');
    
    return `
        <div class="mode-row">
            <div class="mode-label">${shortName}</div>
            <div class="chords-row">
                ${chordsHTML}
            </div>
        </div>
    `;
}

// Render all modes
function renderAllModes(tonality) {
    const container = document.getElementById('modes-container');
    const modesHTML = modes.map(mode => renderModeRow(tonality, mode)).join('');
    container.innerHTML = modesHTML;
    
    // Add click handlers for audio playback
    document.querySelectorAll('#modes-container .chord').forEach(chordEl => {
        chordEl.addEventListener('click', (e) => {
            const chordName = e.currentTarget.dataset.chord;
            playChord(chordName);
        });
    });
}

// Generate all possible chords for the picker
function generateAllChords() {
    const allChords = new Set();
    
    notes.forEach(root => {
        allChords.add(getChordName(root, 'maj'));
        allChords.add(getChordName(root, 'min'));
        allChords.add(getChordName(root, 'dim'));
    });
    
    return Array.from(allChords).sort();
}

// Render chord picker
function renderChordPicker() {
    const container = document.getElementById('chord-picker');
    const allChords = generateAllChords();
    
    const chordsHTML = allChords.map(chord => {
        const isSelected = selectedChords.has(chord);
        let chordClass = 'picker-major';
        if (chord.includes('m') && !chord.includes('dim')) chordClass = 'picker-minor';
        if (chord.includes('°')) chordClass = 'picker-dim';
        
        return `<button class="chord-picker-btn ${chordClass} ${isSelected ? 'selected' : ''}" data-chord="${chord}">${chord}</button>`;
    }).join('');
    
    container.innerHTML = chordsHTML;
    
    // Add click handlers
    document.querySelectorAll('.chord-picker-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chord = e.target.dataset.chord;
            playChord(chord); // Play sound
            if (selectedChords.has(chord)) {
                selectedChords.delete(chord);
            } else {
                selectedChords.add(chord);
            }
            renderChordPicker();
            analyzeChords();
        });
    });
}

// Analyze selected chords and find matching key/mode combinations
function analyzeChords() {
    const resultsContainer = document.getElementById('analysis-results');
    
    if (selectedChords.size === 0) {
        resultsContainer.innerHTML = '<p class="placeholder">Tap chords above to discover<br>possible keys and modes</p>';
        return;
    }
    
    const matches = [];
    const selectedChordsArray = Array.from(selectedChords);
    
    // Check every key/mode combination
    notes.forEach(tonality => {
        modes.forEach(mode => {
            const modeChords = generateModeChords(tonality, mode);
            const modeChordNames = modeChords.map(c => c.name);
            
            // Count how many selected chords are in this mode
            const matchingChords = selectedChordsArray.filter(chord => 
                modeChordNames.includes(chord)
            );
            
            const missingChords = selectedChordsArray.filter(chord => 
                !modeChordNames.includes(chord)
            );
            
            // Only show results with at least 1 matching chord
            if (matchingChords.length > 0) {
                const matchPercentage = (matchingChords.length / selectedChordsArray.length) * 100;
                const isPerfectMatch = matchingChords.length === selectedChordsArray.length;
                
                matches.push({
                    tonality,
                    mode: mode.name.split(' ')[0],
                    fullModeName: mode.name,
                    description: mode.description,
                    matchingChords,
                    missingChords,
                    matchPercentage,
                    isPerfectMatch,
                    characteristicChords: modeChords
                        .filter(c => c.isCharacteristic && selectedChords.has(c.name))
                        .map(c => c.name)
                });
            }
        });
    });
    
    if (matches.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No matches found.<br><br>None of these chords appear together in any diatonic scale.</p>';
        return;
    }
    
    // Sort by: 1) Perfect matches first, 2) Match percentage, 3) Characteristic chords
    matches.sort((a, b) => {
        if (a.isPerfectMatch !== b.isPerfectMatch) {
            return b.isPerfectMatch - a.isPerfectMatch;
        }
        if (a.matchPercentage !== b.matchPercentage) {
            return b.matchPercentage - a.matchPercentage;
        }
        return b.characteristicChords.length - a.characteristicChords.length;
    });
    
    // Limit to top 20 results to avoid overwhelming the user
    const topMatches = matches.slice(0, 20);
    
    const resultsHTML = topMatches.map(match => {
        const badgeClass = match.isPerfectMatch ? 'badge-perfect' : 'badge-partial';
        const badgeText = match.isPerfectMatch ? '✓ Perfect Match' : `${Math.round(match.matchPercentage)}% Match`;
        const hasCharacteristic = match.characteristicChords.length > 0;
        
        return `
        <div class="result-card ${match.isPerfectMatch ? 'perfect-match' : ''} ${hasCharacteristic && match.isPerfectMatch ? 'has-characteristic' : ''}">
            <div class="result-header">
                <span class="result-key">${match.tonality} ${match.mode}</span>
                <span class="badge ${badgeClass}">${badgeText}</span>
            </div>
            <p class="result-description">${match.description}</p>
            ${match.missingChords.length > 0 ? 
                `<p class="result-warning">⚠️ Not in scale: ${match.missingChords.join(', ')}</p>` 
                : ''}
            ${hasCharacteristic && match.isPerfectMatch ? 
                `<p class="result-note">✨ Uses characteristic chords: ${match.characteristicChords.join(', ')}</p>` 
                : ''}
        </div>
    `}).join('');
    
    resultsContainer.innerHTML = resultsHTML;
}

// Tab switching
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Update button states
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content visibility
            tabContents.forEach(content => {
                if (content.id === `${targetTab}-tab`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

// Calculate Roman numeral for a chord in a given key
function getChordRomanNumeral(chord, key) {
    // Get the root note of the chord (remove quality symbols)
    const chordRoot = chord.replace(/m|°/g, '');
    
    // Calculate interval from key
    const keyIndex = notes.indexOf(key);
    const chordIndex = notes.indexOf(chordRoot);
    
    if (keyIndex === -1 || chordIndex === -1) return null;
    
    const interval = (chordIndex - keyIndex + 12) % 12;
    
    // Roman numeral mapping for major scale intervals
    const romanMap = {
        0: { major: 'I', minor: 'i', dim: 'i°' },
        1: { major: '♭II', minor: '♭ii', dim: '♭ii°' },
        2: { major: 'II', minor: 'ii', dim: 'ii°' },
        3: { major: '♭III', minor: '♭iii', dim: '♭iii°' },
        4: { major: 'III', minor: 'iii', dim: 'iii°' },
        5: { major: 'IV', minor: 'iv', dim: 'iv°' },
        6: { major: '♭V', minor: '♭v', dim: '♭v°' },
        7: { major: 'V', minor: 'v', dim: 'v°' },
        8: { major: '♭VI', minor: '♭vi', dim: '♭vi°' },
        9: { major: 'VI', minor: 'vi', dim: 'vi°' },
        10: { major: '♭VII', minor: '♭vii', dim: '♭vii°' },
        11: { major: 'VII', minor: 'vii', dim: 'vii°' }
    };
    
    // Determine chord quality
    let quality = 'major';
    if (chord.includes('°')) quality = 'dim';
    else if (chord.includes('m')) quality = 'minor';
    
    return romanMap[interval][quality];
}

// Check if a chord belongs to the major scale of the key
function isInMajorScale(chord, key) {
    const majorMode = modes[0]; // Ionian
    const scaleChords = generateModeChords(key, majorMode);
    return scaleChords.some(c => c.name === chord);
}

// Render progression chord picker
function renderProgressionPicker() {
    const container = document.getElementById('progression-picker');
    const allChords = generateAllChords();
    
    const chordsHTML = allChords.map(chord => {
        const isSelected = progressionChords.includes(chord);
        let chordClass = 'picker-major';
        if (chord.includes('m') && !chord.includes('dim')) chordClass = 'picker-minor';
        if (chord.includes('°')) chordClass = 'picker-dim';
        
        return `<button class="chord-picker-btn ${chordClass} ${isSelected ? 'selected' : ''}" data-chord="${chord}">${chord}</button>`;
    }).join('');
    
    container.innerHTML = chordsHTML;
    
    // Add click handlers
    document.querySelectorAll('#progression-picker .chord-picker-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chord = e.target.dataset.chord;
            playChord(chord); // Play sound
            const index = progressionChords.indexOf(chord);
            
            if (index > -1) {
                // Remove chord
                progressionChords.splice(index, 1);
            } else {
                // Add chord
                progressionChords.push(chord);
            }
            
            renderProgressionPicker();
            analyzeProgression();
        });
    });
}

// Analyze progression and show Roman numerals
function analyzeProgression() {
    const resultsContainer = document.getElementById('progression-results');
    
    if (progressionChords.length === 0) {
        resultsContainer.innerHTML = '<p class="placeholder">Select chords and a key<br>to see Roman numeral analysis</p>';
        return;
    }
    
    const resultsHTML = progressionChords.map(chord => {
        const romanNumeral = getChordRomanNumeral(chord, progressionKey);
        const inScale = isInMajorScale(chord, progressionKey);
        
        return `
            <div class="progression-chord ${inScale ? '' : 'borrowed'}">
                <div class="prog-chord-name">${chord}</div>
                <div class="prog-roman">${romanNumeral || '?'}</div>
                ${!inScale ? '<span class="prog-badge">Borrowed</span>' : ''}
            </div>
        `;
    }).join('');
    
    resultsContainer.innerHTML = `
        <div class="progression-display">
            ${resultsHTML}
        </div>
        <div class="progression-summary">
            <p><strong>Progression in ${progressionKey} major:</strong></p>
            <p class="progression-formula">${progressionChords.map(c => getChordRomanNumeral(c, progressionKey)).join(' - ')}</p>
        </div>
    `;
    
    // Add click handlers for audio playback on progression chords
    document.querySelectorAll('.progression-chord').forEach(chordEl => {
        chordEl.addEventListener('click', (e) => {
            const chordName = e.currentTarget.querySelector('.prog-chord-name').textContent;
            playChord(chordName);
        });
    });
}

// Initialize the app
function init() {
    const tonalitySelector = document.getElementById('tonality');
    const progressionKeySelector = document.getElementById('progression-key');
    
    // Initialize tabs
    initTabs();
    
    // Render explorer
    renderAllModes(tonalitySelector.value);
    
    // Render analyzer
    renderChordPicker();
    
    // Render progression
    renderProgressionPicker();
    
    // Listen for tonality changes
    tonalitySelector.addEventListener('change', (e) => {
        renderAllModes(e.target.value);
    });
    
    // Listen for progression key changes
    progressionKeySelector.addEventListener('change', (e) => {
        progressionKey = e.target.value;
        analyzeProgression();
    });
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

