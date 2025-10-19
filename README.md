# Modal Composer

A d web application for exploring musical modes and analyzing chord progressions. Built for composers, songwriters, and music theory enthusiasts 

## Features

### Mode Explorer
- **All Modes in One View**: See all 7 modes (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian) simultaneously
- **Interactive Tonality Selection**: Choose any of the 12 chromatic tones as your root
- **Characteristic Chord Highlighting**: Blue highlight shows which chords define each mode's unique sound
- **Ultra-Compact Design**: Everything fits on one screen without scrolling - perfect for mobile

### Chord Analyzer
- **Reverse Lookup**: Select the chords you're using in your song
- **Smart Analysis**: Instantly see all possible key/mode combinations
- **Match Percentage**: Shows perfect matches (✓) and partial matches (%) 
- **Missing Chord Detection**: See which chords don't fit the scale
- **Intelligent Ranking**: Results sorted by match quality and characteristic chords
- **Handles Borrowed Chords**: Works even when mixing chords from different keys

### Progression Builder (NEW!)
- **Roman Numeral Analysis**: See the function of each chord in any key
- **Choose Your Chords**: Build your progression by selecting chords
- **Pick a Key**: Analyze your progression in any major key
- **Interval Relationships**: Shows I, ii, V, etc. for each chord
- **Borrowed Chord Detection**: Highlights chords that don't belong to the key
- **Copy-Ready Formula**: Get your progression formula (e.g., I - vi - IV - V)
  
## How to Use

### Mode Explorer
1. Open `index.html` in your web browser
2. Tap the "Explorer" tab
3. Select your root key from the dropdown
4. View all 7 modes simultaneously - blue chords are the characteristic ones for each mode

### Chord Analyzer
1. Tap the "Analyzer" tab
2. Select the chords you're using in your song (tap to select/deselect)
3. View results ranked by best match:
   - **✓ Perfect Match** (green) = All chords fit the scale
   - **% Match** (orange) = Partial match with some borrowed chords
4. Check warnings (⚠️) to see which chords don't fit
5. Look for characteristic chord notes (✨) for strong modal flavor
6. Use this to identify your key, discover alternatives, or understand your borrowed chords

### Progression Builder
1. Tap the "Progression" tab
2. Select the chords in your progression (in any order)
3. Choose the key you want to analyze in from the dropdown
4. See each chord displayed with its:
   - Chord name (e.g., C, Dm, G)
   - Roman numeral (e.g., I, ii, V)
   - "Borrowed" badge if it's not in the major scale
5. View the complete progression formula at the bottom
6. Use this to understand, communicate, or transpose your progressions

## Understanding the Modes

### Ionian (Major Scale)
The familiar major scale. Bright, happy, and stable. Characteristic chords: **I** and **IV**

### Dorian
Minor with a raised 6th. Jazzy, sophisticated, and slightly melancholic. Characteristic chords: **ii** and **IV**

### Phrygian
Minor with a lowered 2nd. Spanish/flamenco flavor, exotic and dark. Characteristic chords: **♭II** and **♭VI**

### Lydian
Major with a raised 4th. Dreamy, floating, and ethereal. Characteristic chords: **II** and **#iv°**

### Mixolydian
Major with a lowered 7th. Bluesy, rock-oriented, and uplifting. Characteristic chords: **I7**, **♭VII**, and **v**

### Aeolian (Natural Minor)
The natural minor scale. Melancholic, sad, but stable. Characteristic chords: **♭VI** and **♭VII**

### Locrian
Diminished tonic. Unstable, dark, and tense. Rarely used for composition. Characteristic chords: **i°** and **♭V**

## Music Theory Tips

### What are Characteristic Chords?
Characteristic chords are the chords that make each mode sound unique. They contain the notes that differ from the standard major or minor scale, giving the mode its distinctive flavor.

### How to Use This Tool for Composition

1. **Choose Your Mode**: Select the emotional quality you want (bright, dark, jazzy, etc.)
2. **Use Characteristic Chords**: Build progressions around the starred (★) chords to establish the modal sound
3. **Experiment**: Try progressions using the non-characteristic chords while occasionally returning to the characteristic ones to maintain the modal feel
4. **Resolution**: Resolve to the tonic chord (first chord) of the mode for stability

### Example Progressions

**Dorian (jazzy minor)**:
- i - IV - i (characteristic chords emphasize Dorian)
- i - ii - IV - i

**Lydian (dreamy major)**:
- I - II - I (the II major chord is the Lydian signature)
- I - II - iii - I

**Mixolydian (rock/blues)**:
- I - ♭VII - I (classic rock sound)
- I - ♭VII - IV - I

## Chord Analyzer Examples

### Example 1: Identifying Your Key
You're working with: **C, F, G**
1. Select these chords in the Analyzer
2. Results show "✓ Perfect Match" for: **C Ionian** (C major), **G Mixolydian**, **F Lydian**
3. "C Ionian" is typically the strongest match since C-F-G are I-IV-V in C major

### Example 2: Borrowed Chords
You're using: **C, A** (both major)
1. Select these chords
2. Results show "50% Match" for several keys:
   - **C Ionian** contains C but not A major (shows: ⚠️ Not in scale: A)
   - **A Ionian** contains A but not C major (shows: ⚠️ Not in scale: C)
3. This tells you you're using a borrowed chord or mixing keys
4. You can still see which key fits better based on your tonic

### Example 3: Modal Discovery
You're using: **Dm, G, Am, C**
1. Select these chords
2. Results show "✓ Perfect Match" for: **C Ionian**, **D Dorian**, **G Mixolydian**
3. If you're emphasizing Dm, you're likely in **D Dorian**
4. The analyzer helps you see all valid interpretations

### Example 4: Finding Compatible Chords
You have: **Em, F, Bm**
1. Analyzer shows partial and perfect matches
2. Find a "✓ Perfect Match" result like **E Phrygian**
3. Switch to Explorer tab and select that key/mode
4. Now you can see all available chords to add to your progression

## Progression Builder Examples

### Example 1: Classic Pop Progression
1. Go to "Progression" tab
2. Select: **C, Am, F, G**
3. Choose key: **C**
4. Result: **I - vi - IV - V** (the famous pop progression)

### Example 2: Understanding Borrowed Chords
1. Select: **C, Em, F, A**
2. Choose key: **C**
3. Result shows:
   - C = I
   - Em = iii
   - F = IV
   - A = VI (marked as "Borrowed" - this is from C minor/parallel borrowing)
4. Now you understand A is borrowed from C minor for color

### Example 3: Transposing Progressions
1. You know a song is: **I - IV - v - IV** in some key
2. You want to play it in **G**
3. Select key **G** in the Progression tab
4. Build G - C - Dm - C to match that formula
5. Or discover what chords make up that formula in any key

## Technical Details

- **Pure HTML/CSS/JavaScript**: No dependencies, no build process
- **Responsive Design**: Mobile-first approach with modern CSS Grid
- **Music Theory Engine**: Calculates scales, chords, and modal characteristics dynamically

## File Structure

```
ComposingApp/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── app.js          # Music theory logic and interactions
└── README.md       # This file
```

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential features for future versions:
- Audio playback for chords (hear what each mode sounds like)
- Custom chord progression builder and saver
- Export/share progressions
- Extended chords (9ths, 11ths, 13ths) support
- Harmonic minor and melodic minor modes
- MIDI keyboard support
- Suggested chord progressions for each mode
- Chord substitution recommendations

## License

Free to use for personal and educational purposes.

## Credits

Built with ♥ for musicians and composers exploring modal harmony.

---

**Happy Composing! 🎹🎸🎶**

