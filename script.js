(function() {
           
    if (screen.width > 460) { // Tablet e desktop
        banner_generico = '<img src="image/banners/banner-desktop-1.jpg"></img>';
        banners =  '<img src="image/banners/banner-1.webp" class="banner">';
        banners += '<img src="image/banners/banner-2.webp" class="banner">';
        banners += '<img src="image/banners/banner-3.webp" class="banner">';
        banners += '<img src="image/banners/banner-4.webp" class="banner">';
        banners += '<img src="image/banners/banner-5.webp" class="banner">';
    } else { // Mobile
        banner_generico = '<img src="image/banners/banner-mobile-1-parte-1.jpg"></img>';
        banner_generico += '<img style="margin-top: -77px; width: 700px;" src="image/banners/banner-mobile-1-parte-2.png"></img>';
        banners =  '<img src="image/banners/banner-1-mobile.webp" class="banner">';
        banners += '<img src="image/banners/banner-2-mobile.webp" class="banner">';
        banners += '<img src="image/banners/banner-3-mobile.webp" class="banner">';
        banners += '<img src="image/banners/banner-4-mobile.webp" class="banner">';
        banners += '<img src="image/banners/banner-5-mobile.jpg" class="banner">';
    }
    document.querySelector('.slide-show .banners').innerHTML += banners;
    document.querySelector('.banner-generico').innerHTML += banner_generico;

    // Menu quando tela for menor que 1024px
    var $conteudo_menu = document.querySelector('.conteudo-menu-mobile');

    // Menu hamburguer
    document.querySelector('.hamburguer').addEventListener("click", function(event) {

        // Para mudar o CSS do menu hamburguer para um X ou vice-versa
        event.preventDefault();
        this.classList.toggle('-active');

        // Toggle → conteúdo do menu
        var vlr_conteudo_menu = $conteudo_menu.style.display === 'block' ? 'none' : 'block';
        alterarCss('.segunda-linha', $conteudo_menu.style.display);
        alterarCss('.conteudo-menu-mobile', vlr_conteudo_menu);
        
    });

    /*** Slideshow ***/
    
    var $slideshow = document.querySelector('.slide-show');
    var $banners = document.querySelectorAll('.slide-show .banner');
    var $div_opcoes = document.querySelector('.slide-show .opcoes');

    var banner_atual = 0;
    var qtde_banners = $banners.length;

    $slideshow.addEventListener("mouseover", function() { alterarCss('.setas-laterais', 'flex'); });
    $slideshow.addEventListener("mouseout", function() { alterarCss('.setas-laterais', 'none'); });

    alterarCss('.slide-show .banners', qtde_banners*100 + 'vw', 'width');

    // Adiciona o primeiro botão na div (botão ativo no momento que carrega a página)
    $div_opcoes.innerHTML += '<div class="opcao-0"><i class="ativo"></i></div>';

    // Adiciona um botão para cada um dos banners que não estão ativos
    for (var i = 1; i < qtde_banners; i++) {
        $div_opcoes.innerHTML += '<div class="opcao-' + i + '"><i></i></div>';
    }

    var $opcoes = document.querySelectorAll('.slide-show .opcoes > div');

    document.querySelector('.setas-laterais .seta-esquerda').addEventListener("click", function() {
        if (parseInt(banner_atual) === 0) {
            $opcoes[qtde_banners - 1].click();
        } else {
            $opcoes[parseInt(banner_atual) - 1].click();
        }
    });
    document.querySelector('.setas-laterais .seta-direita').addEventListener("click", function() {
        if (parseInt(banner_atual) === qtde_banners - 1) {
            $opcoes[0].click();
        } else {
            $opcoes[parseInt(banner_atual) + 1].click();
        }
    });

    for (var i = 0; i < $opcoes.length; i++) {
        $opcoes[i].addEventListener("click", function() {

            // Desativa a opção antiga
            document.querySelector('.slide-show .opcoes .ativo').removeAttribute("class");

            // Ativa a nova opção
            this.querySelector('i').classList.add("ativo");

            var splits = this.className.split('-');
            banner_atual = splits[1];

            // Oculta os banners anteriores a ele
            for (var i = 0; i < banner_atual; i++) {
                $banners[i].style.display = 'none';
            }

            // Exibe os banners após ele
            for (var i = banner_atual; $banners[i]; i++){
                $banners[i].style.display = 'block';
            }
        });
    }

    function alterarCss(selector, value, prop = 'display') {
        document.querySelector(selector).style[prop] = value;
    }


    /*** Carrossel de produtos ***/

    var $linhas = document.querySelectorAll('.carrossel-produtos .linha');
    var $setas = document.querySelectorAll('.carrossel-produtos .seta');
    var $seta_direita = document.querySelector('.carrossel-produtos .seta-direita');
    var $seta_esquerda = document.querySelector('.carrossel-produtos .seta-esquerda');

    // Deixa só a primeira linha visível
    for (var i = 1; i < $linhas.length; i++) {
        $linhas[i].style.display = 'none';
    }

    for (var i = 0; i < $linhas.length; i++) {

        $linhas[i].addEventListener("mouseover", function() {

            var splits = this.className.split('-');
            var linha_atual = splits[1];

            // Se existe linha posterior a linha atual
            if ($linhas[parseInt(linha_atual) + 1]) {
                $seta_direita.style.display = 'block';
            }

            // Se existe linha anterior a linha atual
            if ($linhas[parseInt(linha_atual) - 1]) {
                $seta_esquerda.style.display = 'block';
            }
        });

        $linhas[i].addEventListener("mouseout", function() {
            $seta_esquerda.style.display = 'none';
            $seta_direita.style.display = 'none';
        });
    }

    for (var i = 0; i < $setas.length; i++) {

        $setas[i].addEventListener("mouseover", function() {
           getSetas();
        });

        $setas[i].addEventListener("click", function () {

            // Oculta a linha atual
            var linha_atual = getLinhaAtual();
            $linhas[linha_atual].style.display = 'none';

            var splits = this.className.split('-');

            if (splits[1] === 'direita') {
                // Exibe a próxima linha
                $linhas[linha_atual + 1].style.display = 'flex';
            } else {
                // Exibe a linha anterior
                $linhas[linha_atual - 1].style.display = 'flex';
            }

            getSetas();
        });
    }

    function getSetas() {

        var linha_atual = getLinhaAtual();

        // Se não existe linha posterior a nova linha atual
        if (!$linhas[parseInt(linha_atual) + 1]) {
            // Esconde a seta direita
            $seta_direita.style.display = 'none';
        } else {
            $seta_direita.style.display = 'block';
        }

        // Se não existe linha anterior a nova linha atual
        if (!$linhas[parseInt(linha_atual) - 1]) {
            // Esconde a seta esquerda
            $seta_esquerda.style.display = 'none';
        } else {
            $seta_esquerda.style.display = 'block';
        }    
    }

    function getLinhaAtual() {
        for (var i = 0; i < $linhas.length; i++) {
            if ($linhas[i].style.display !== 'none') {
                return i;
            }
        }
    }

})();