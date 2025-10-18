// audio setup
const keyStrokeSounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3")
];

export const useKeyboardSound = () => {
    const playRandomKeyStrokeSound = () => {
        const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

        randomSound.currentTime = 0; //Setting for better UX purpose
        randomSound.play().catch((error) => console.log("Audio play failed:", error))

    }

    return { playRandomKeyStrokeSound }
}