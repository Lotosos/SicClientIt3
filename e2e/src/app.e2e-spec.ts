import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Aplicação SiCCliente');
  });

  it('should have title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Aplicação SiCCliente');
  });

  it('should have routelink to gestor', () => {
    page.navigateTo();
    expect(page.getClienteNavigator().getText()).toEqual('Cliente');
  });

  it('should have routelink to cliente', () => {
    page.navigateTo();
    expect(page.getGestorNavigator().getText()).toEqual('Gestor de Catálogos');
  });

  it('should route to cliente - title', () => {
    page.navigateTo();
    page.getClienteNavigator().click();
    expect(page.getClienteTitle()).toEqual("Opções de Utilização");
  });

  it('should route to gestor - title', () => {
    page.navigateTo();
    page.getGestorNavigator().click();
    expect(page.getGestorTitle()).toEqual("Ferramentas de Gestor de Catálogo");
  });

  it('should have button to back to home from gestor', () => {
     page.navigateTo();
     page.getGestorNavigator().click();
     expect(page.getNavBackHomeFromGestor().getText()).toEqual("Home");
   });

   it('should have button to back to home from cliente', () => {
    page.navigateTo();
    page.getClienteNavigator().click();
    expect(page.getNavBackHomeFromCliente().getText()).toEqual("Home");
  });

  it('should have routelink to produto', () => {
    page.navigateTo();
    page.getGestorNavigator().click();
    expect(page.getProdutoNavigator().getText()).toEqual('Gestão de Produtos');
  });

  it('should have routelink to categoria', () => {
    page.navigateTo();
    page.getGestorNavigator().click();
    expect(page.getCategoriaNavigator().getText()).toEqual('Gestão de Categorias');
  });

  it('should have routelink to material', () => {
    page.navigateTo();
    page.getGestorNavigator().click();
    expect(page.getMaterialNavigator().getText()).toEqual('Gestão de Materiais');
  });

  it('should have routelink to acabamento', () => {
    page.navigateTo();
    page.getGestorNavigator().click();
    expect(page.getAcabamentoNavigator().getText()).toEqual('Gestão de Acabamentos');
  });

  it('should have routelink to agregacao', () => {
    page.navigateTo();
    page.getGestorNavigator().click();
    expect(page.getAgregacaoNavigator().getText()).toEqual('Gestão de Agregações');
  });

  it('should have routelink to item', () => {
    page.navigateTo();
    page.getClienteNavigator().click();
    expect(page.getItemNavigator().getText()).toEqual('Gestão de Items');
  });

  it('should have routelink to encomenda', () => {
    page.navigateTo();
    page.getClienteNavigator().click();
    expect(page.getEncomendaNavigator().getText()).toEqual('Gestão de Encomendas');
  });
});
