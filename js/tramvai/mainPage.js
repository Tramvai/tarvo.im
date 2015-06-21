var mainPage = (function() {
    openModal = function(e) {
        e.stopPropagation();
        var div = $(e.currentTarget);
        var marginTop = (div.parent().is('#coding-box')) ? '-370px' : '-30px';

        div.addClass('modal-opened');
        div.removeClass('box-content modal-trigger');
        div.css('margin-top', marginTop);

        if (div.parent().is('#sport-box')) {
            div.find('.close-modal-button').fadeIn(500);
            div.find('.modal-loading-indicator').fadeIn(500);
        } else if (div.parent().is('#coding-box')) {
            setTimeout(function() { githubView.displayGithubContent(); }, 300);
        } else if (div.parent().is('#notes-box')) {
            div.css('margin-left', '-360px');
        }
    }

    closeModal = function(e) {
        e.stopPropagation();
        var div = $(e.currentTarget).parent();

        div.removeClass('modal-opened');
        div.addClass('box-content modal-trigger');
        div.css('margin-top', '0px');

        if (div.parent().is('#sport-box')) {
            div.find('.close-modal-button').hide();
            div.find('.modal-loading-indicator').hide();
        } else if (div.parent().is('#coding-box')) {
            githubView.hideGithubContent();
        } else if (div.parent().is('#notes-box')) {
            div.css('margin-left', '0px');
        }
    }

    displayContent = function() {
        $('#page-loading-indicator').fadeOut(500);
        $('#page-content-wrap').fadeIn(1000);
    }

    return {
        openModal: openModal,
        closeModal: closeModal,
        displayContent: displayContent
    }
})();
