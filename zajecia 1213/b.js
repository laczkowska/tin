// script.js
$(document).ready(function() {
    fetchAlbums();

    $('#backButton').click(function() {
        $('#albumDetails').hide();
        $('#albumList').show();
    });

    $('#photoForm').submit(function(event) {
        event.preventDefault();
        const newPhoto = {
            albumId: $('#albumId').val(),
            title: $('#title').val(),
            url: $('#url').val(),
            thumbnailUrl: $('#thumbnailUrl').val()
        };
        $.post('https://jsonplaceholder.typicode.com/photos', newPhoto, function(data) {
            alert('Zdjęcie dodane: ' + JSON.stringify(data));
        });
    });
});

function fetchAlbums() {
    $.get('https://jsonplaceholder.typicode.com/albums', function(albums) {
        const albumList = $('#albumList');
        albums.forEach(album => {
            const albumItem = $('<div class="album-item"></div>');
            albumItem.text(album.title);
            albumItem.click(function() {
                fetchAlbumDetails(album.id, album.title);
            });
            albumList.append(albumItem);
        });
    });
}

function fetchAlbumDetails(albumId, albumTitle) {
    $('#albumTitle').text(albumTitle);
    $('#albumList').hide();
    $('#albumDetails').show();
    $.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, function(photos) {
        const photosList = $('#photosList');
        photosList.empty();
        photos.forEach(photo => {
            const photoItem = $('<a class="photo-item" data-lightbox="album"></a>');
            photoItem.attr('href', photo.url);
            const img = $('<img>').attr('src', photo.thumbnailUrl).attr('alt', photo.title);
            photoItem.append(img);
            photosList.append(photoItem);
        });
    });
}
