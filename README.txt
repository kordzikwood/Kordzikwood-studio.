KORDZIKWOOD Studio 4.3 — aktualizacja GitHub Pages

INSTALACJA: Przed zmianami wykonaj eksport wszystkich projektów z teksturami.
Rozpakuj ZIP, prześlij pliki z wnętrza folderu (index.html, studio43.js, sw.js,
manifest.webmanifest i ikony) do katalogu głównego repozytorium GitHub na main.
Nie usuwaj istniejących projektów ani danych Safari. Poczekaj na publikację Pages.

NOWE: Zestawy złożone z maks. 50 modułów, osobna edycja każdego modułu przez
istniejący konstruktor 4.2.2, zmiana kolejności, duplikowanie, usuwanie,
orientacyjna elewacja, wspólny blat szafek dolnych, szkic pomieszczenia
(prostokąt/L/U), zbiorcze formatki, CSV, eksport zestawu z teksturami,
import zestawu i import starego pliku pojedynczego projektu 4.x do zestawu.

ZACHOWANIE DANYCH: Stare projekty nadal są w kluczu kwstudio_projects_v3;
nowe zestawy zapisują się osobno pod kwstudio_sets_v43. Tekstury pozostają
w tej samej bazie IndexedDB KORDZIKWOOD_TEXTURES.

OGRANICZENIA: Szkic pomieszczenia nie modeluje rzeczywistych narożników,
przeszkód, drzwi ani kolizji. Wspólny blat jest prostokątnym elementem
liczonym dla szafek typu dolnego; nie uwzględnia wycięć, łączeń ani przerw
między szafkami dolnymi. Elewacja jest szkicem 2D, nie pełnym modelem 3D
całego zestawu. Formatki wymagają weryfikacji przed cięciem.
