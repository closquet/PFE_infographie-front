export const upFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const personName = (value) => {
    return /^(?:[a-zàáâäçèéêëìíîïñòóôöùúûü]+([\s-][a-zàáâäçèéêëìíîïñòóôöùúûü]+)*)+$/i.test(value);
};