"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [mainnetData, setMainnetData] = useState(null);
  const [testnetData, setTestnetData] = useState(null);
  const [chainType, setChainType] = useState("mainnet");

  const [currentChain, setCurrentChain] = useState<string>("");

  const fetchMainnetData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/hyperlane-xyz/v3-docs/main/static/addresses/mainnet.json"
      );

      const data = await response.json();
      setMainnetData(data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchTestnetData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/hyperlane-xyz/v3-docs/main/static/addresses/testnet.json"
      );

      const data = await response.json();
      setTestnetData(data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMainnetData();
    fetchTestnetData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bottom-0 left-0 flex flex-col items-center justify-center w-full bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <p className="text-2xl font-bold mb-4 text-center text-blue-600">
          Hyperlane Addresses
        </p>
        <Tabs
          defaultValue="mainnet"
          className="w-[350px] ml"
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

                      {mainnetData &&
                        Object.keys(mainnetData).map((chain) => (
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

                      {testnetData &&
                        Object.keys(testnetData).map((chain) => (
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
        <div className="mt-8">
          {chainType === "mainnet" &&
            mainnetData &&
            currentChain &&
            mainnetData[currentChain] && (
              <div className="list-disc pl-6">
                {Object.entries(mainnetData[currentChain]).map(
                  ([key, value]) => (
                    <div key={key} className="mb-2">
                      {/* <strong className="font-bold">{key}:</strong> */}
                      <Snippet
                        symbol={key}
                        className="bg-white "
                        size="sm"
                        variant="solid"
                      >
                        {value as string}
                      </Snippet>
                    </div>
                  )
                )}
              </div>
            )}

          {chainType === "testnet" &&
            testnetData &&
            currentChain &&
            testnetData[currentChain] && (
              <div className="list-disc pl-6">
                {Object.entries(testnetData[currentChain]).map(
                  ([key, value]) => (
                    <div key={key} className="mb-2">
                      {/* <strong className="font-bold">{key}:</strong> */}
                      <Snippet
                        symbol={key}
                        className="bg-white "
                        size="sm"
                        variant="solid"
                      >
                        {value as string}
                      </Snippet>
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
