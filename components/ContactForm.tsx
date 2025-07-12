"use client";

import { useState } from 'react';
import { MessageSquare, Send, RefreshCw, AlertCircle, CheckCircle2, Phone, X } from 'lucide-react';
import { useContactForm } from '@/hooks/use-contact-form';
import { useLanguage } from '@/contexts/LanguageContext';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

interface ContactFormProps {
    className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
    const { t } = useLanguage();
    const [showWhatsAppOption, setShowWhatsAppOption] = useState(false);

    const {
        form,
        isSubmitting,
        submitCount,
        whatsappUrl,
        errors,
        isValid,
        formProgress,
        onSubmit,
        contactWhatsApp,
        clearForm,
    } = useContactForm({
        onSuccess: (data, response) => {
            console.log('✅ Formulario enviado exitosamente:', data);
            if (response.whatsappUrl) {
                setShowWhatsAppOption(true);
            }
        },
        onError: (error) => {
            console.error('❌ Error en el formulario:', error);
        },
    });

    const { register, control, formState: { isDirty } } = form;

    return (
        <div className={className}>
            <Card className="corporate-card shadow-2xl card-hover">
                <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-[rgb(var(--theme-fg))] text-2xl flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-[#003366]" />
                            {t('consultaCorpTitle')}
                        </CardTitle>
                        {isDirty && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={clearForm}
                                className="text-[rgb(var(--theme-text))] hover:text-[#003366]"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Limpiar
                            </Button>
                        )}
                    </div>

                    <CardDescription className="text-[rgb(var(--theme-text))]">
                        {t('contactDescription')}
                    </CardDescription>

                    {/* Progreso del formulario */}
                    {formProgress > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[rgb(var(--theme-text))]">Progreso del formulario</span>
                                <span className="text-[#003366] font-medium">{formProgress}%</span>
                            </div>
                            <Progress value={formProgress} className="h-2" />
                        </div>
                    )}

                    {/* Mostrar opción de WhatsApp después del envío */}
                    {showWhatsAppOption && whatsappUrl && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                <div className="flex items-center justify-between">
                                    <span>¡Consulta enviada! ¿Prefiere una respuesta inmediata?</span>
                                    <Button
                                        size="sm"
                                        onClick={() => window.open(whatsappUrl, '_blank')}
                                        className="bg-green-600 hover:bg-green-700 text-white ml-2"
                                    >
                                        <Phone className="h-4 w-4 mr-1" />
                                        WhatsApp
                                    </Button>
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-6">
                            {/* Nombre y Apellido */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="nombre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[rgb(var(--theme-fg))]">
                                                {t('nombre')} *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('nombre')}
                                                    className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="apellido"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[rgb(var(--theme-fg))]">
                                                {t('apellido')} *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('apellido')}
                                                    className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Empresa */}
                            <FormField
                                control={control}
                                name="empresa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[rgb(var(--theme-fg))]">
                                            {t('empresa')} *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t('empresa')}
                                                className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[rgb(var(--theme-fg))]">
                                            {t('email')} *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder={t('email')}
                                                className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Teléfono */}
                            <FormField
                                control={control}
                                name="telefono"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[rgb(var(--theme-fg))]">
                                            {t('telefono')} *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+54 11 1234-5678"
                                                className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Área de Consulta */}
                            <FormField
                                control={control}
                                name="areaConsulta"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[rgb(var(--theme-fg))]">
                                            {t('areaConsulta')} *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ej: M&A, Derecho Societario, Contratos, etc."
                                                className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Mensaje */}
                            <FormField
                                control={control}
                                name="mensaje"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[rgb(var(--theme-fg))]">
                                            {t('descripcionCaso')} *
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={t('descripcionCaso')}
                                                rows={4}
                                                className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-[rgb(var(--theme-text))] text-sm">
                                            Describa brevemente su consulta legal (mínimo 20 caracteres)
                                        </FormDescription>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    className="flex-1 bg-[#003366] hover:bg-[#003366]/80 text-white font-semibold shadow-xl hover:shadow-[#003366]/25 btn-corporate"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            {t('enviarConsulta')}
                                        </>
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={contactWhatsApp}
                                    className="flex-1 sm:flex-initial border-[#25d366] text-[#25d366] hover:bg-[#25d366] hover:text-white"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    WhatsApp
                                </Button>
                            </div>

                            {/* Información adicional */}
                            <Alert className="mt-6">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-[rgb(var(--theme-text))]">
                                    <strong>Información de privacidad:</strong> Sus datos serán tratados con absoluta confidencialidad
                                    y utilizados únicamente para responder a su consulta legal. No compartimos información personal
                                    con terceros.
                                </AlertDescription>
                            </Alert>

                            {/* Contador de envíos (para desarrollo) */}
                            {submitCount > 0 && (
                                <div className="text-xs text-[rgb(var(--theme-text))] text-center">
                                    Formulario enviado {submitCount} {submitCount === 1 ? 'vez' : 'veces'}
                                </div>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
} 