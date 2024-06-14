export interface SidebarParameters {
    position: 'start'|'end',
    mode: 'over'|'push'|'side', // Modo del sidebar
    disableClose: boolean, // Si se puede cerrar con la tecla escape o haciendo clic en el backdrop.
}