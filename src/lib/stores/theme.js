import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialize the theme from localStorage or default to 'lofi'
const initialTheme = browser ? localStorage.getItem('theme') || 'lofi' : 'lofi';

export const theme = writable(initialTheme);

// Subscribe to theme changes and update localStorage and data-theme
if (browser) {
    theme.subscribe(value => {
        localStorage.setItem('theme', value);
        document.documentElement.setAttribute('data-theme', value);
    });
}