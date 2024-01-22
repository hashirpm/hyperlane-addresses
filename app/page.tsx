"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Snippet } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [mainnetAddresses, setMainnetAddresses] = useState(null);
  const [mainnetChainMetadata, setMainnetChainMetadata] = useState(null);

  const [testnetAddresses, setTestnetAddresses] = useState(null);
  const [testRecipients, setTestRecipients] = useState(null);
  const [testnetChainMetadata, setTestnetChainMetadata] = useState(null);
  const [chainType, setChainType] = useState("mainnet");

  const [currentChain, setCurrentChain] = useState<string>("");

  const fetchMainnetData = async () => {
    try {
      const mainnetAddressesResponse = await fetch(
        "https://raw.githubusercontent.com/hyperlane-xyz/v3-docs/main/static/addresses/mainnet.json"
      );
      const mainnetChainMetadataResponse = await fetch(
        "https://raw.githubusercontent.com/hyperlane-xyz/v3-docs/main/static/chainmetadata/mainnet.json"
      );
      const mainnetAddressesData = await mainnetAddressesResponse.json();
      const mainnetChainMetadaData = await mainnetChainMetadataResponse.json();
      setMainnetAddresses(mainnetAddressesData);
      setMainnetChainMetadata(mainnetChainMetadaData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchTestnetData = async () => {
    try {
      const testnetResponse = await fetch(
        "https://raw.githubusercontent.com/hyperlane-xyz/v3-docs/main/static/addresses/testnet.json"
      );
      const testRecipientResponse = await fetch(
        "https://raw.githubusercontent.com/hyperlane-xyz/v3-docs/main/static/addresses/testrecipients.json"
      );
      const testnetChainMetadataResponse = await fetch(
        "https://raw.githubusercontent.com/hyperlane-xyz/v3-docs/main/static/chainmetadata/testnet.json"
      );
      const testnetData = await testnetResponse.json();
      const testRecipientData = await testRecipientResponse.json();
      const testnetChainMetadaData = await testnetChainMetadataResponse.json();

      setTestnetAddresses(testnetData);
      setTestRecipients(testRecipientData);
      setTestnetChainMetadata(testnetChainMetadaData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMainnetData();
    fetchTestnetData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="bottom-0 left-0 flex flex-col items-center justify-center w-full bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <p className="text-2xl font-bold mb-4 text-center text-blue-600">
          Hyperlane Addresses
        </p>
        <Tabs
          defaultValue="mainnet"
          className="w-[300px] m-2"
          onValueChange={(e) => setChainType(e)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mainnet">Mainnet</TabsTrigger>
            <TabsTrigger value="testnet">Testnet</TabsTrigger>
          </TabsList>
          <TabsContent value="mainnet">
            <Card>
              <CardHeader>
                <CardTitle>Mainnet Addresses</CardTitle>
                <CardDescription>Select the chain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Select onValueChange={(e) => setCurrentChain(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Chains</SelectLabel>

                      {mainnetAddresses &&
                        Object.keys(mainnetAddresses).map((chain) => (
                          <SelectItem key={chain} value={chain}>
                            {chain}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="testnet">
            <Card>
              <CardHeader>
                <CardTitle>Testnet Addresses</CardTitle>
                <CardDescription>Select the chain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Select onValueChange={(e) => setCurrentChain(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Chain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Chains</SelectLabel>

                      {testnetAddresses &&
                        Object.keys(testnetAddresses).map((chain) => (
                          <SelectItem key={chain} value={chain}>
                            {chain}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {chainType === "mainnet" &&
          mainnetAddresses &&
          currentChain &&
          mainnetAddresses[currentChain] && (
            <Card className="w-full md:w-[350px] lg:w-[600px] m-2 overflow-auto">
              {mainnetChainMetadata && mainnetChainMetadata[currentChain] && (
                <>
                  <strong className="pl-2 text-xs font-bold">Domain ID</strong>
                  <Snippet
                    symbol="Domain ID"
                    className="bg-white "
                    size="sm"
                    variant="solid"
                    hideSymbol
                  >
                    {mainnetChainMetadata[currentChain]["domainId"]}
                  </Snippet>
                </>
              )}
              {Object.entries(mainnetAddresses[currentChain]).map(
                ([key, value]) => (
                  <div key={key} className="mb-2">
                    <strong className="pl-2 text-xs font-bold">{key}</strong>

                    <Snippet
                      symbol={key}
                      className="bg-white"
                      size="sm"
                      variant="solid"
                      hideSymbol
                    >
                      {value as string}
                    </Snippet>
                  </div>
                )
              )}
            </Card>
          )}

        {chainType === "testnet" &&
          testnetAddresses &&
          currentChain &&
          testnetAddresses[currentChain] && (
            <Card className="w-full md:w-[350px] lg:w-[550px] m-2 overflow-auto">
              {testnetChainMetadata && testnetChainMetadata[currentChain] && (
                <>
                  <strong className="pl-2 text-xs font-bold">Domain ID</strong>
                  <Snippet
                    symbol="Domain ID"
                    className="bg-white "
                    size="sm"
                    variant="solid"
                    hideSymbol
                  >
                    {testnetChainMetadata[currentChain]["domainId"]}
                  </Snippet>
                </>
              )}
              {Object.entries(testnetAddresses[currentChain]).map(
                ([key, value]) => (
                  <div key={key} className="mb-2">
                    <strong className="pl-2 text-xs font-bold">{key}</strong>
                    <Snippet
                      symbol={key}
                      className="bg-white "
                      size="sm"
                      variant="solid"
                      hideSymbol
                    >
                      {value as string}
                    </Snippet>
                  </div>
                )
              )}
              {testRecipients &&
                testRecipients[currentChain] &&
                Object.entries(testRecipients[currentChain]).map(
                  ([key, value]) => (
                    <div key={key} className="mb-2">
                      <strong className="pl-2 text-xs font-bold">{key}</strong>
                      <Snippet
                        symbol={key}
                        className="bg-white "
                        size="sm"
                        variant="solid"
                        hideSymbol
                      >
                        {value as string}
                      </Snippet>
                    </div>
                  )
                )}
            </Card>
          )}
      </div>
    </main>
  );
}
