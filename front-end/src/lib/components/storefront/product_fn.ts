const handleMove = (image, e) => {
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = width / 2 - (e.clientX - left);
    const y = height / 2 - (e.clientY - top);
    console.log(x, y);
    image.style.transform = `translate(${x / 5}px, ${y / 5}px)`;
    image.style.scale = '3';
    image.style.transition = 'scale 0.5s';
}

const moveHandler = (e) => {
    e.preventDefault();
    const image = document.getElementById('image');
    handleMove(image, e);
}

export const moveListener = (e) => {
    e.preventDefault();

    const image = document.getElementById('image');
    handleMove(image, e);

    image.addEventListener('mousemove', moveHandler);

    image?.addEventListener('mouseleave', () => {
        image.style.transform = 'translate(0, 0)';
        image.style.scale = '1';
        image.style.transition = 'scale 0.5s';
    });
}

export const releaseListener = (e) => {
    const image = document.getElementById('image');
    image.style.transform = 'translate(0, 0)';
    image.style.scale = '1';
    image.style.transition = 'scale 0.5s';
    image.removeEventListener('mousemove', moveHandler);
};


