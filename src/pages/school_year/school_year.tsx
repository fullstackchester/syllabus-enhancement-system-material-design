import type { JSX } from "react"
import style from './schoolyear.module.css'
import { Progress } from '@mantine/core';

function SchoolYearPage(): JSX.Element {
  const percentage: number = 56;
  return (
    <>
        <h1 className={style.custom_headings}>School Year 2025-2026</h1>
        <Progress size="xs" value={percentage} />
    </>
  )
}

export default SchoolYearPage