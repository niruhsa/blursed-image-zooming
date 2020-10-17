$(document).ready(async () => {
    const img = $("#blursed-image");
    const container = $(".container");
    var initialDistance;
    var initialZoomCoords;
    var totalZoom = 1;
    var zoomFactor = 1;
    var lastZoomEvent = new Date();


    container.css('height', img.height());
    container.css('width', img.width());
    container.css('overflow', 'scroll');

    const imageBase64 = await encodeImageFileAsURL();

    img.on('touchstart', (e) => {
        if (event.touches.length === 2) {
            e.preventDefault();
            const offset = { x: img.position().left, y: img.position().top, w: img.width(), h: img.height() }

            const firstFinger = { x: e.touches[0].clientX - offset.x, y: e.touches[0].clientY - offset.y };
            const secondFinger = { x: e.touches[1].clientX - offset.x, y: e.touches[1].clientY - offset.y };

            const distance = Math.sqrt(Math.pow(Math.abs(firstFinger.x - secondFinger.x), 2) + Math.pow(Math.abs(firstFinger.y - secondFinger.y), 2));

            const xDistance = firstFinger.x > secondFinger.x ? firstFinger.x - secondFinger.x : secondFinger.x - firstFinger.x;
            const yDistance = firstFinger.y > secondFinger.y ? firstFinger.y - secondFinger.y : secondFinger.y - firstFinger.y;

            const initialZoom = {
                x: firstFinger.x > secondFinger.x ? (firstFinger.x - (xDistance / 2)) : (secondFinger.x - (xDistance / 2)),
                y: firstFinger.y > secondFinger.y ? (firstFinger.y - (yDistance / 2)) : (secondFinger.y - (yDistance / 2))
            };
            
            initialDistance = distance;
            initialZoomCoords = initialZoom;
        }
    });

    img.on('touchend', (e) => {
        if (new Date().getTime() - lastZoomEvent < 100) {
            totalZoom = totalZoom *= zoomFactor;

            if (totalZoom < 1) totalZoom = 1;
            else if (totalZoom > 10) totalZoom = 10;

            console.log('[CURRENT ZOOM] ' + totalZoom);
            lastZoomEvent = 0;
        }
    })

    img.on('touchmove', (e) => {
        if (event.touches.length === 2) {
            e.preventDefault();

            const offset = { x: img.position().left, y: img.position().top, w: img.width(), h: img.height() }

            const firstFinger = { x: e.touches[0].clientX - offset.x, y: e.touches[0].clientY - offset.y };
            const secondFinger = { x: e.touches[1].clientX - offset.x, y: e.touches[1].clientY - offset.y };

            const touchPoints = { 
                x: firstFinger.x > secondFinger.x ? secondFinger.x : firstFinger.x,
                y: firstFinger.y > secondFinger.y ? secondFinger.y : firstFinger.y,
                w: Math.abs(firstFinger.x - secondFinger.x),
                h: Math.abs(firstFinger.y - secondFinger.y)
            }

            const distance = Math.sqrt(Math.pow(Math.abs(firstFinger.x - secondFinger.x), 2) + Math.pow(Math.abs(firstFinger.y - secondFinger.y), 2));
            
            zoomFactor = distance / initialDistance;
            const uncalcTotalZoom = Math.min(10, Math.max(1, totalZoom * zoomFactor));

            const zoomCoords = {
                zoomFactor: uncalcTotalZoom,
                x: ((img.width() * uncalcTotalZoom) - img.width()) / uncalcTotalZoom,
                y: ((img.height() * uncalcTotalZoom) - img.height()) / uncalcTotalZoom,
                w: img.width() / uncalcTotalZoom,
                h: img.height() / uncalcTotalZoom,
                originalWidth: parseInt(img.width()),
                originalHeight: parseInt(img.height())
            };

            const coords = window.TouchCoordinates = { x: zoomCoords.x, y: zoomCoords.y, w: zoomCoords.w, h:zoomCoords.h, originalWidth: zoomCoords.originalWidth, originalHeight: zoomCoords.originalHeight };
            const image = window.zoom_image(imageBase64.split("data:image/png;base64,")[1], coords.x, coords.y, coords.w, coords.h, coords.originalWidth, coords.originalHeight);
            img.attr('src', image);
            console.log(zoomCoords);
            lastZoomEvent = new Date().getTime();
        }

    });
});

function encodeImageFileAsURL() {
    return new Promise(async (resolve) => {
        var c = document.getElementById('blursed-canvas');
        var img = document.getElementById('blursed-image');
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.onload = function() {
            c.height = img.naturalHeight;
            c.width = img.naturalWidth;
            var ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, c.width, c.height);
            var base64String = c.toDataURL();
            return resolve(base64String);
        }
    });
}