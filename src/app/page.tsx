'use client'

import { useFetch } from "@/hooks/useFetch";
import classes from "./page.module.css";
import { Item } from "@/utils/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useList } from "@/hooks/useList";
import { ActionIcon, Box, Flex, FloatingIndicator, Grid, LoadingOverlay, rem, ScrollArea, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

type ButtonTooltip = { label: string, tooltip: string };
const buttonData: ButtonTooltip[] = [
  {
    label: "First option",
    tooltip: "Option that fits 'Filter all previous entries with more than five words in the title ordered by the number of comments first.'"
  },
  {
    label: "Second option",
    tooltip: "Option that fits 'Filter all previous entries with less than or equal to five words in the title ordered by points.'"
  }
]

export default function Home() {

  const [active, setActive] = useState<number>(0);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  const {
    data: fetchedFirstData,
    error: fetchFirstError,
    loading: fetchFirstLoading,
    reload: fetchFirstReload
  } = useFetch<Item[]>('/api/news/first', 'GET');

  const {
    data: fetchedSecondData,
    error: fetchSecondError,
    loading: fetchSecondLoading,
    reload: fetchSecondReload
  } = useFetch<Item[]>('/api/news/second', 'GET');

  const [data, { override }] = useList<Item>([]);

  const setControlRef = useCallback((index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs)
  }, [controlsRefs]);

  const controls = useMemo(() => buttonData.map((item: ButtonTooltip, index: number) => (
    <Tooltip
      key={item.label}
      label={item.tooltip}
      withArrow>
      <UnstyledButton
        ref={setControlRef(index)}
        className={classes.control}
        onClick={() => setActive(index)}
        data-active={active === index || undefined}>
        <Text
          className={classes.controlLabel}
          ta='center'>
          {`${item.label} (${index === 0 ? fetchedFirstData?.length || 0 : fetchedSecondData?.length || 0})`}
        </Text>
      </UnstyledButton>
    </Tooltip>
  )), [active, setControlRef, fetchedFirstData, fetchedSecondData]);

  const handleReloadClick = useCallback(() => {
    if (active === 0) {
      fetchFirstReload();
    } else {
      fetchSecondReload();
    }
  }, [active, fetchFirstReload, fetchSecondReload]);

  const listHackerComments = useMemo(() => data.map(e => (
    <Grid
      key={e.number}
      w='100%'
      gutter={rem(8)}
      className={classes.item}>
      <Grid.Col span={9}>
        <Flex align='center' h='100%'>
          <Text>{e.title}</Text>
        </Flex>
      </Grid.Col>
      <Grid.Col span={3}>
        <Flex
          direction='column'>
          <Text>Rank: {e.number}</Text>
          <Text>Points: {e.points}</Text>
          <Text>Comments: {e.comments}</Text>
        </Flex>
      </Grid.Col>
    </Grid>
  )), [data]);

  useEffect(() => {
    if (fetchedFirstData && active === 0) {
      override(fetchedFirstData);
    }
  }, [fetchedFirstData, active, override]);

  useEffect(() => {
    if (fetchedSecondData && active === 1) {
      override(fetchedSecondData);
    }
  }, [fetchedSecondData, active, override]);

  useEffect(() => {
    if (fetchFirstError) notifications.show({ message: fetchFirstError.message, color: "red" });
    else if (fetchSecondError) notifications.show({ message: fetchSecondError.message, color: "red" });
  }, [fetchFirstError, fetchSecondError]);

  return (
    <main className={classes.main}>
      <Flex
        direction='column'
        gap={rem(16)}
        h='100%'
        miw={500}
        maw={700}>
        <Box style={{ alignSelf: 'flex-end' }}>
          <ActionIcon
            variant="transparent"
            onClick={handleReloadClick}>
            <IconReload />
          </ActionIcon>
        </Box>
        <Flex
          justify='center'
          className={classes.root}
          ref={setRootRef}
          gap={rem(8)}
          w='100%'>
          {controls}
          <FloatingIndicator
            target={controlsRefs[active]}
            parent={rootRef}
            className={classes.indicator}
          />
        </Flex>
        <Box
          pos='relative'>
          <LoadingOverlay
            visible={fetchFirstLoading || fetchSecondLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ type: 'dots' }}
          />
          <ScrollArea
            scrollbarSize={4}
            w='100%'
            h={600}>
            <Flex
              p={rem(8)}
              justify='center'
              align='center'
              direction='column'
              w='100%'
              gap={rem(8)}>
              {listHackerComments}
            </Flex>
          </ScrollArea>
        </Box>
      </Flex>
    </main>
  );
}
