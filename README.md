# Summit Survey Release 2018

## English project info

Online survey for Developer Summit [http://delphi.pl/zlot/]()

## O projekcie

Projekt powstał na wewnętrzne potrzeby głosowania na najlepszego wykładowcę Zlotu Programistów Delphi. Pierwsza edycja została uruchomiona w roku 2018 i pozwoliła z sukcesem zebrać głosy oraz wyłonić najlepszego wykładowcę.

Projekt został zbudowany w JavaScript i w założeniu ma używać minimalną liczbę frameworków. Dla wygody na początku do wizualizacji został użyty Bootstrap 4.1, który wymaga włączenia JQuery. W dalszej fazie rozwoju planuję usunięcie JQuery oraz zbudowanie własnego responsywnego arkusza stylów.

## SurveyAPI - serwer REST

Klient JavaScript współpracuje z SurveyAPI, czyli z serwerem REST. Serwer ma za zadanie:

* rejestrować głosy uczestników zlotu
* przekazywać do klienta listę aktualnych głosów
* autoryzować użytkownika na podstawie unikalnego kodu
* wyliczać wyniki ankiety

O dodatkowe informacje na temat SurveyAPI proszę pytać autora projektu.

## Uwagi

SurveyAPI jest w fazie rozwoju i docelowo ma zostać umieszczone na niezależnym serwerze oraz zostanie upubliczniona jego dokumentacja. Nie planujemy otworzyć kodu źródłowego dla API. API tymczasowo zostało stworzone w języku PHP, ale docelowo ma zostać zbudowane w Delphi.

## Dokumentacja

* [Bieżące zadania](./doc/ToDo.md)

## Współpraca

Projekt jest otwarty na współpracę. Zapraszam programistów, którzy chcą sprawdzić swoje umiejętności w praktyce