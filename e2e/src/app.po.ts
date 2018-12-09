import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getClienteNavigator() {
    return element(by.css('[routerlink="/cliente"]'));
  }

  getGestorNavigator() {
    return element(by.css('[routerlink="/gestor"]'));
  }

  getClienteTitle() {
    return element(by.css('h4')).getText(); 
  }

  getGestorTitle() {
    return element(by.css('h4')).getText(); 
  }

  getNavBackHomeFromGestor() {
    return element(by.css('[routerLink="/"]')); 
  }

  getNavBackHomeFromCliente() {
    return element(by.css('[routerLink="/"]')); 
  }

  getProdutoNavigator() {
    return element(by.css('[routerlink="/gestor/produto"]'));
  }

  getCategoriaNavigator() {
    return element(by.css('[routerlink="/gestor/categoria"]'));
  }

  getMaterialNavigator() {
    return element(by.css('[routerlink="/gestor/material"]'));
  }

  getAcabamentoNavigator() {
    return element(by.css('[routerlink="/gestor/acabamento"]'));
  }

  getAgregacaoNavigator() {
    return element(by.css('[routerlink="/gestor/agregacao"]'));
  }

  getItemNavigator() {
    return element(by.css('[routerlink="/cliente/item"]'));
  }

  getEncomendaNavigator() {
    return element(by.css('[routerlink="/cliente/encomenda"]'));
  }

}
