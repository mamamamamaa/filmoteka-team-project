export function pagination2(markup) {
    document.getElementById('stuff').innerHTML += markup.join('');

    var SlickPagination = function (options) {
        var self = this;
        this.perPage = 3;
        this.visiblePages = 1;

        if (!options.itemsContainer || !options.paginationContainer) {
            console.warn('Slick Pagination: Missing Required Settings');
        }

        for (var key in options) {
            this[key] = options[key];
        }

        this.items = this.itemsContainer.children;
        this.numberOfItems = this.items.length;
        this.totalPages = parseInt(Math.ceil(this.numberOfItems / this.perPage));
        this.visibilePages =
            this.totalPages < this.visiblePages ? this.totalPages : this.visiblePages;

        for (var i = 0; i < this.items.length; i++) {
            if (i < this.perPage) {
                this.items[i].style.display = 'inline-block';
            }
        }

        this.attachClickEvents = function () {
            var pageLinks = this.paginationContainer.querySelectorAll('a');

            for (var i = 0; i < pageLinks.length; i++) {
                var pageLink = pageLinks[i];

                pageLink.onclick = function (e) {
                    e.preventDefault();
                    var page = e.target.innerText;
                    var currentPage = parseInt(
                        self.paginationContainer.querySelector('.active').innerText
                    );
                    var newPage =
                        page === '<<'
                            ? 1
                            : page == '>>'
                                ? self.totalPages
                                : page == '<'
                                    ? currentPage - 1
                                    : page == '>'
                                        ? currentPage + 1
                                        : parseInt(page);

                    if (newPage > 0 && newPage <= self.totalPages) {
                        var startItem = parseInt(newPage * self.perPage) - self.perPage;
                        var endItem = parseInt(startItem + self.perPage) - 1;
                        var startPage = newPage - Math.floor(self.visibilePages / 2);
                        var endPage = newPage + Math.floor(self.visibilePages / 2);

                        for (var j = 0; j < self.items.length; j++) {
                            self.items[j].style.display =
                                j >= startItem && j <= endItem ? 'inline-block' : 'none';
                        }

                        if (
                            newPage <
                            self.visibilePages - Math.ceil(self.visibilePages / 2) + 1
                        ) {
                            startPage = 1;
                            endPage = self.visibilePages;
                        } else if (
                            newPage >
                            self.totalPages - Math.ceil(self.visibilePages / 2)
                        ) {
                            startPage = self.totalPages - (self.visibilePages - 1);
                            endPage = self.totalPages;
                        }

                        self.buildPagination(startPage, endPage, newPage);
                    }

                    window.scrollTo(
                        0,
                        self.itemsContainer.getBoundingClientRect().top + window.scrollY - 200
                    );
                };
            }
        };

        this.buildPagination = function (startPage, endPage, currentPage) {
            var pageLinks = '';
            var backDisabled = currentPage === 1 ? ' class="disabled"' : '';
            var nextDisabled =
                currentPage === this.totalPages ? ' class="disabled"' : '';
            var backLinks =
                this.totalPages > this.visiblePages
                    ? '<li><a href="#"' +
                    backDisabled +
                    '><<</a></li><li><a href="#"' +
                    backDisabled +
                    '><</a></li>'
                    : '';
            var nextLinks =
                this.totalPages > this.visiblePages
                    ? '<li><a href="#"' +
                    nextDisabled +
                    '>></a></li><li><a href="#"' +
                    nextDisabled +
                    '>>></a></li>'
                    : '';

            for (var i = startPage; i <= endPage; i++) {
                var active = i === currentPage ? ' class="active"' : '';
                pageLinks +=
                    '<li><a' +
                    active +
                    ' href="#" data-page="' +
                    i +
                    '">' +
                    i +
                    '</a></li>';
            }

            this.paginationContainer.innerHTML = backLinks + pageLinks + nextLinks;

            this.attachClickEvents();
        };

        this.buildPagination(1, this.visibilePages, 1);
    };

    new SlickPagination({
        itemsContainer: document.getElementById('stuff'),
        paginationContainer: document.querySelector('.pagination2'),
        visiblePages: 3,
    });

    
};