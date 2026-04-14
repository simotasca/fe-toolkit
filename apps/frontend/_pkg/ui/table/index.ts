import { Body } from "./Body";
import { Cell, type CellProps } from "./Cell";
import { Container } from "./Container";
import { Foot } from "./Foot";
import { Head } from "./Head";
import { Header, type HeaderProps } from "./Header";
import { InfoPanel } from "./InfoPanel";
import { Row } from "./Row";
import { Table } from "./Table";

export { Body, Cell, type CellProps, Container, Foot, Head, Header, type HeaderProps, Row, Table, InfoPanel };

export const t = { Body, Cell, Container, Foot, Head, Header, Row, Table, InfoPanel } as const;
